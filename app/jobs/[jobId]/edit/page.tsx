import EditJobPageClient from "./page.client";

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

const EditJobPage = async ({ params }: EditJobPageProps) => {
  const currentJob = await getJob(params.jobId);
  
  return (
    <EditJobPageClient currentJob={currentJob} />
  )
}

export default EditJobPage