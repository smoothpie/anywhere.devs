import jobs from '../../../data/jobs.json';
import companies from '../../../data/companies.json';
import JobPageClient from "./page.client";

async function getJob(id: string) {
  const res = await fetch(`${process.env.CLIENT_URL}/api/jobs/${id}`, { cache: 'no-store' });

  if (res.ok) {
    const job = await res.json();
    return job;
  } else {
    const errorText = await res.text();
    console.log("Error fetching job:", errorText);
    throw new Error("Error fetching job");
  }
}

type EditJobPageProps = {
  params: {
    jobId: string;
  }
}

const JobPage = async ({ params }: EditJobPageProps) => {
  // const currentJob = await getJob(params.jobId);
  const currentJob = jobs.find(c => c.id === Number(params.jobId));

  const currentJobCompany = companies.find(c => c.id === currentJob.companyId);
  
  return (
    <JobPageClient currentJob={currentJob} company={currentJobCompany} />
  )
}

export default JobPage