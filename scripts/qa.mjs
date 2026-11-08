import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {join,resolve} from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const txt=path=>readFileSync(join(root,path),'utf8');
const walk=(dir)=>readdirSync(join(root,dir),{withFileTypes:true}).flatMap(x=>
  x.isDirectory()?walk(`${dir}/${x.name}`):[`${dir}/${x.name}`]);
const content=txt('lib/content.ts');
const values=(name)=>{
  const start=content.indexOf(`export const ${name}`);
  assert.ok(start>=0,`${name} collection missing`);
  const end=content.indexOf('];',start);
  assert.ok(end>start,`${name} array not terminated`);
  return [...content.slice(start,end).matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(x=>x[1]);
};
const services=values('services'),articles=values('articles'),solutions=values('solutions');
const routes=new Set(['/', '/about','/calculator','/contacts','/services','/solutions','/knowledge',
  '/resources','/resources/git-checklist', ...services.map(x=>`/services/${x}`),
  ...articles.map(x=>`/knowledge/${x}`), ...solutions.map(x=>`/solutions/${x}`)]);
let links=0;const missing=[];
for(const file of walk('app').concat(walk('components'))){
  if(!/\.(tsx|ts)$/.test(file))continue;
  const source=txt(file);
  // For literal href values; variable/computed href is separately covered by the route collection.
  for(const match of source.matchAll(/href=["'](\/[^"']*)["']/g)){
    const dest=match[1].split(/[?#]/)[0]||'/';links++;
    if(!routes.has(dest) && !existsSync(join(root,`public${dest}`)))missing.push(`${file}: ${dest}`);
  }
}
const seo=txt('lib/seo.ts');
for(const slug of services)assert.ok(seo.includes(`'${slug}':`),`Missing SEO service: ${slug}`);
for(const slug of articles)assert.ok(seo.includes(`'${slug}':`),`Missing SEO article: ${slug}`);
assert.ok(existsSync(join(root,'public/promsafe-logo-original.png')),'Missing official logo');
assert.ok(existsSync(join(root,'public/og-promsafe.png')),'Missing social preview');
assert.ok(existsSync(join(root,'public/PromSafe_checklist_GIT.pdf')),'Missing checklist');
assert.ok(txt('app/robots.ts').includes('indexableSite()'),'Missing indexing guard');
assert.ok(txt('app/layout.tsx').includes('indexableSite()'),'Missing meta indexing guard');
assert.ok(txt('app/sitemap.ts').includes('services.map') && txt('app/sitemap.ts').includes('articles.map'),'Sitemap missing dynamic routes');
assert.ok(txt('next.config.ts').includes("source:'/socialaudit'"),'Legacy social audit redirect missing');
assert.equal(missing.length,0,`Broken literal internal links:\n${missing.join('\n')}`);
console.log(`PASS: ${services.length} services, ${articles.length} articles, ${solutions.length} solutions, ${routes.size} routes, ${links} literal internal links`);
console.log('PASS: SEO metadata coverage, official assets, sitemap, indexing guard, legacy redirect');
