import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const base=(process.argv[2]||'http://localhost:3000').replace(/\/$/,'');
const src=readFileSync(resolve(import.meta.dirname,'../lib/content.ts'),'utf8');
const slugs=name=>[...src.slice(src.indexOf(`export const ${name}`),src.indexOf('];',src.indexOf(`export const ${name}`))).matchAll(/slug:'([^']+)'/g)].map(m=>m[1]);
const paths=['/','/about','/contacts','/services','/solutions','/knowledge','/calculator','/resources','/resources/git-checklist',...slugs('services').map(x=>`/services/${x}`),...slugs('articles').map(x=>`/knowledge/${x}`),...slugs('solutions').map(x=>`/solutions/${x}`),'/robots.txt','/sitemap.xml','/api/health','/PromSafe_checklist_GIT.pdf'];
const failed=[];
for(const path of paths){
  try{
    const response=await fetch(base+path,{signal:AbortSignal.timeout(15_000),redirect:'manual'});
    if(response.status!==200){failed.push(`${path} HTTP ${response.status}`);continue}
    const type=response.headers.get('content-type')||'';
    if(path==='/PromSafe_checklist_GIT.pdf'&&!type.includes('pdf'))failed.push(`${path}: expected PDF content type`);
    if(!path.endsWith('.xml')&&!path.endsWith('.txt')&&!path.endsWith('.pdf')&&!path.startsWith('/api/')){
      const html=await response.text();
      if(!/<html[^>]*lang="ru"/.test(html))failed.push(`${path}: missing ru language`);
      if(!/<h1\b/i.test(html))failed.push(`${path}: missing H1`);
      if(!/<title>/.test(html))failed.push(`${path}: missing title`);
    }
  }catch(error){failed.push(`${path}: ${String(error)}`)}
}
const redirect=await fetch(base+'/socialaudit',{signal:AbortSignal.timeout(15_000),redirect:'manual'}).catch(()=>null);
if(!redirect||![301,302,307,308].includes(redirect.status))failed.push('/socialaudit: old URL is not redirected');
console.log(`Checked ${paths.length} paths and old socialaudit redirect on ${base}`);
if(failed.length){console.error(failed.join('\n'));process.exit(1)}
console.log('PASS: all pages and assets reachable');
