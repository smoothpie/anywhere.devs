import Link from "next/link";
import Image from 'next/image';
import { shortenDescription } from '@/utils/string';
import { Company } from '../../../../types/job';
import s from './CompanyCard.module.scss';

type CompanyCardProps = {
  company: Company;
  isAdmin?: boolean;
}

function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast(item => num >= item.value);
  return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}

const CompanyCard = ({ company, isAdmin }: CompanyCardProps) => {
  return (
    <Link href={`/companies/${company.id}`}>
      <article className={s.companyContainer}>
        {isAdmin && (
          <div className={s.adminToolbar}>
            <Link href={`/companies/${company.id}/edit`}>
              <Image src="/edit.svg" alt="edit" width={20} height={20} />
            </Link>
          </div>
        )}
        <div className={s.company}>
          <Image src={company.logo} alt={company.name} width={100} height={100} />
          <h3>{company.name}</h3>
          <p>{company.description ? shortenDescription(company.description) : '-'}</p>
          <div className={s.price}><strong>Headquarters:</strong> {company.headquarters}</div>
          {/* <div className={s.footer}>
            <div className={s.tag}>{categoryLabel}</div>
            {company.author && <div className={s.tag}>{company.author}</div>}
          </div> */}
        </div>
      </article>
    </Link>
  )
}

export default CompanyCard