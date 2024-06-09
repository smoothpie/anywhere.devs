import jobs from '../data/jobs.json';
import companies from '../data/companies.json'
import ResourcesPageClient from "./jobs/page.client";

const ResourcesPage = async () => {
  // const jobs = await getJobs()

  const jobsWithCompanies = jobs.map(job => {
    const company = companies.find(c => c.id === job.companyId);
    return {
      ...job,
      company
    }
  })
  
  return (
    <ResourcesPageClient resources={jobsWithCompanies} />
  )
}

export default ResourcesPage
