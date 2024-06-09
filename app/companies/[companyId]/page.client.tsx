"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import JobCard from '@/app/jobs/_components/JobCard';
import ActiveJob from '@/app/jobs/_components/ActiveJob';
import s from './CompanyPage.module.scss';
import { Company } from '@/types/job';

type CompanyPageClient = {
  currentCompany?: Company;
  jobs: any[];
}

const CompanyPageClient = ({ currentCompany, jobs }: CompanyPageClient) => {
  const router = useRouter()

  if (!currentCompany) return null;

  const jobsWithCompany = jobs.map((job) => ({
    ...job,
    company: currentCompany
  }))

  return (
    <div className={s.container}>
      <Image src={currentCompany.logo} alt={currentCompany.name} width={100} height={100} />
      <h1>{currentCompany.name}</h1>
      <p>{currentCompany.description}</p>
      <div className={s.price}><strong>Headquarters:</strong> {currentCompany.headquarters}</div>
      <div className={s.price}>
        <strong>Website:{' '}</strong>
        <Link href={currentCompany.website} target="_blank">{currentCompany.website}</Link>
      </div>

      <h2>Jobs</h2>
      {jobsWithCompany.map((job) => (
        <Link href={`/jobs/${job.id}`} key={job.id}>
          <JobCard key={job.id} job={job} onClick={jobId => {}} />
        </Link>
      ))}
    </div>
  )
}

export default CompanyPageClient;