import jobs from '../../data/jobs.json'
import JobsPageClient from "./page.client";

async function getJobs() {
  const res = await fetch(`${process.env.CLIENT_URL}/api/jobs`, { cache: 'no-store' });

  if (res.ok) {
    const jobs = await res.json();
    return jobs;
  } else {
    const errorText = await res.text();
    console.log("Error fetching jobs:", errorText);
    throw new Error("Error fetching jobs");
  }
}

const JobsPage = async () => {
  const jobs = await getJobs()

  console.log(jobs.filter(j => j["Department"] === "Engineering").length, "JOBS")
  
  return (
    <JobsPageClient resources={jobs} />
  )
}

export default JobsPage