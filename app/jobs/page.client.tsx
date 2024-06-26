"use client"
import { useState } from 'react';
import Link from "next/link";
import Header from './_components/Header';
import Sorter from './_components/Sorter';
import Filters from './_components/Filters';
import JobCard from './_components/JobCard';
import ActiveJob from './_components/ActiveJob';
import { Job } from '../../types/job';
import s from './Jobs.module.scss';

type ResourcesProps = {
  resources: any[];
}

const ResourcesPageClient = ({ resources }: ResourcesProps) => {
  const [filterValues, setFilterValues] = useState<any>({});
  const [filteredResults, setFilteredResults] = useState<any[]>(resources);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [activeJob, setActiveJob] = useState<any>(null);

  console.log(activeJob, "STT")

  return (
    <div className={s.main}>
      <Header />
      {/* <div className={s.header}>
        <h1>Browse coding jobs</h1>
        {isAdmin && (
          <Link href="/jobs/add">
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
        <Filters
          jobs={resources}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setFilteredResults={setFilteredResults}
          setActiveJob={setActiveJob}
        />

        <div className={!activeJob ? s.jobs : `${s.jobs} ${s.jobsNarrow}`}>
          {filteredResults.map((job, i) => (
            <>
              <JobCard key={job.ID} job={job} onClick={(job) => setActiveJob(job)} />
              {activeJob?.id === job.id && (
                <div className={s.activeJobMobile}>
                  <ActiveJob job={activeJob} onClose={() => setActiveJob(null)} />
                </div>
              )}
            </>
          ))}
        </div>

        {activeJob !== null && (
          <div className={s.activeJobDesktop}>
            <ActiveJob job={activeJob} onClose={() => setActiveJob(null)} />
          </div>
        )}
      </section>
    </div>
  )
}

export default ResourcesPageClient