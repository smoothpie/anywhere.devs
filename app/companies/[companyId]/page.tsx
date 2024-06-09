import companies from '../../../data/companies.json';
import jobs from '../../../data/jobs.json';
import CompanyPageClient from "./page.client";

// async function getCompany(id: string) {
//   const res = await fetch(`${process.env.CLIENT_URL}/api/companys/${id}`, { cache: 'no-store' });

//   if (res.ok) {
//     const company = await res.json();
//     return company;
//   } else {
//     const errorText = await res.text();
//     console.log("Error fetching company:", errorText);
//     throw new Error("Error fetching company");
//   }
// }

type EditCompanyPageProps = {
  params: {
    companyId: string;
  }
}

const CompanyPage = async ({ params }: EditCompanyPageProps) => {
  // const currentCompany = await getCompany(params.companyId);
  const currentCompany = companies.find(c => c.id === Number(params.companyId));

  const currentCompanyJobs = jobs.filter(j => j.companyId === Number(params.companyId));
  
  return (
    <CompanyPageClient currentCompany={currentCompany} jobs={currentCompanyJobs} />
  )
}

export default CompanyPage