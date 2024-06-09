"use client"
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from '../jobs/_components/Header';
import Sorter from '../jobs/_components/Sorter';
import Filters from '../jobs/_components/Filters';
import CompanyCard from './_components/CompanyCard';
import { Company } from '../../types/job';
import s from './Companies.module.scss';

type CompaniesProps = {
  companies: Company[];
}

const ResourcesPageClient = ({ companies }: CompaniesProps) => {
  const [filterValues, setFilterValues] = useState<any>({});
  const [filteredResults, setFilteredResults] = useState<any[]>(companies);
  const { user } = useUser();
  const isAdmin = user && (user.publicMetadata?.role === 'admin');

  useEffect(() => {
    setFilteredResults(companies.filter(v => {
      let match = true;
      if (filterValues.search && !v.name.toLowerCase().includes(filterValues.search.toLowerCase())) {
        match = false;
      }
      return match;
    })
    )
  }, [filterValues])
  
  return (
    <div className={s.main}>
      <Header />
      {/* <div className={s.header}>
        <h1>Browse coding companies</h1>
        {isAdmin && (
          <Link href="/companies/add">
            <button>Add new</button>
          </Link>
        )}
      </div> */}
      <div className={s.topBar}>
        <input
          className={s.search}
          placeholder="Search..."
          onChange={e => setFilterValues({ ...filterValues, search: e.target.value })}
        />
        {/* <Sorter filteredResults={filteredResults} setFilteredResults={setFilteredResults} /> */}
        <div className={s.resultsCount}>
          <div className={s.resultsCountNumber}>{filteredResults.length}</div>&nbsp;results
        </div>
      </div>
      <section className={s.content}>
        {/* <Filters
          companies={resources}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setFilteredResults={setFilteredResults}
        /> */}

        <div className={s.companies}>
          {filteredResults.filter(c => c.category !== "article").map((company) => (
            <CompanyCard key={company.id} company={company} isAdmin={!!isAdmin} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ResourcesPageClient