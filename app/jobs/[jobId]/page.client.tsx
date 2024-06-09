"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import s from './JobPage.module.scss';
import { Job, JobFormValues } from '@/types/job';

type JobPageClient = {
  currentJob: Job;
  company: any;
}

const JobPageClient = ({ currentJob, company }: JobPageClient) => {
  const router = useRouter()

  return (
    <div className={s.container}>
      <Image src={company.logo} alt={company.name} width={100} height={100} />
      <h1>{currentJob.title}</h1>
      <p>{currentJob.description}</p>
      <div className={s.price}><strong>Location:</strong> {currentJob.remoteIn}</div>
      <div className={s.price}><strong>Salary:</strong> {currentJob.salary}</div>
      <div className={s.price}>
        <strong>Company:{' '}</strong>
        <Link href={`/companies/${company?.id}`} target="_blank">{company?.name}</Link>
      </div>
      {company.description && (
        <div className={s.price}><strong>Company description:</strong> {company.description}</div>
      )}
      <div className={s.footer}>
        <div className={s.tags}>
          {/* {job.tags?.map((tag: string) => (
            <div key={tag} className={s.tag}>{tag}</div>
          ))} */}
          <div className={s.tag}>{currentJob.type}</div>
          {currentJob.remoteIn === "TRUE" && <div className={s.tag}>Remote possible</div>}
          {currentJob.visaSponsorship === "TRUE" && <div className={s.tag}>Visa sponsorship</div>}
        </div>
      </div>
      <Link
        href={currentJob.link}
        target="_blank"
        className={s.apply}
      >
        <button>Apply</button>
      </Link>
    </div>
  )
}

export default JobPageClient;