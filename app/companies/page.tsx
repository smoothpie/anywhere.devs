import companies from '../../data/companies.json';
import CompaniesPageClient from "./page.client";

const CompaniesPage = async () => {
  // const courses = await getCourses()
  
  return (
    <CompaniesPageClient companies={companies} />
  )
}

export default CompaniesPage
