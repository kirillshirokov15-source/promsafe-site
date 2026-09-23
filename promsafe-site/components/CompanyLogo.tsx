import Image from 'next/image';

type Props={
  className?:string;
  priority?:boolean;
  variant?:'default'|'footer';
};

export default function CompanyLogo({className='',priority=false,variant='default'}:Props){
  return <div className={`companyLogo ${variant==='footer'?'companyLogoFooter':''} ${className}`.trim()}>
    <Image
      src="/promsafe-logo-original.png"
      alt="Промбезопасность Консалт"
      width={1009}
      height={783}
      priority={priority}
      sizes={variant==='footer'?'150px':'180px'}
    />
  </div>;
}
