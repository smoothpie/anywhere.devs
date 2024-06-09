import { useEffect } from 'react';
import Select from '../../../../components/Select';
import { departmentOptions, typeOptions, levelOptions } from '../../constants';
import { Job } from '../../../../types/job';
import jobs from '../../../../data/jobs.json';
import s from './Filters.module.scss';

type FiltersProps = {
  jobs: Job[];
  filterValues: any;
  setFilterValues: (values: any) => void;
  setFilteredResults: (results: any[]) => void;
  setActiveJob: (job: any | null) => void;
}

const Filters = ({ jobs, filterValues, setFilterValues, setFilteredResults, setActiveJob }: FiltersProps) => {
  useEffect(() => {
    setFilteredResults(jobs.filter(v => {
      let match = true;
      if (filterValues.search && !v.title.toLowerCase().includes(filterValues.search.toLowerCase())) {
        match = false;
      }
      // if (filterValues.onlyFree && v.price) {
      //   match = false;
      // }
      // if (filterValues.givesCertificate && !v.certificate) {
      //   match = false;
      // }
      // if (filterValues.platform && filterValues.platform !== "All" && v.platform !== filterValues.platform) {
      //   match = false;
      // }
      console.log(filterValues.skills, "SKILLS")
      if (filterValues.skills && filterValues.skills.length > 0 && !filterValues.skills.includes("All") && !filterValues.skills.some((skill: any) => v.skills.includes(skill.value))) {
        match = false;
      }
      if (filterValues.type && filterValues.type !== "all" && v["type"] !== filterValues.type) {
        match = false;
      }
      // if (filterValues["Remote possible?"] && v["Remote possible?"] !== "TRUE") {
      //   match = false;
      // }
      if (filterValues["Worldwide only"] && !v.remoteIn.includes("Anywhere") && !v.remoteIn.includes("Worldwide") && !v.remoteIn.includes("Fully")) {
        match = false;
      }
      if (filterValues["Visa sponsorship"] && !v.visaSponsorship) {
        match = false;
      }
      // if (filterValues.level && filterValues.level !== "All" && v.level !== filterValues.level) {
      //   match = false;
      // }
      return match;
    }))
    setActiveJob(null);
  }, [filterValues])

  const clearFilters = () => {
    setFilterValues({
      category: "All",
      platform: "All",
      level: "All",
    });
  }

  const skillOptions = jobs
    .reduce((acc: any, job) => {
      job.skills.forEach((skill) => {
        if (!acc.includes(skill)) {
          acc.push({
            label: skill,
            value: skill,
          });
        }
      });
      return acc;
    }, [{
      label: "All",
      value: "All",
    }])
    // filter duplicates
    .filter((v: any, i: number, a: any) => a.findIndex((t: any) => (t.label === v.label)) === i);

  return (
    <div className={s.filters}>
      <div className={s.filtersHeader}>
        <h2>Filters</h2>
        <button onClick={clearFilters}>Clear all</button>
      </div>

      {/* <div className={s.field}>
        <label htmlFor="department">Department</label>
        <Select
          name="department"
          options={departmentOptions}
          value={departmentOptions.find(v => v.label === filterValues.department)}
          onChange={(option) => setFilterValues({ ...filterValues, department: option?.label || "All" })}
          isSearchable
          isClearable
        />
      </div> */}

      <div className={s.field}>
        <label htmlFor="skills">Skills</label>
        <Select
          name="skills"
          options={skillOptions}
          value={filterValues.skills}
          onChange={(value) => setFilterValues({ ...filterValues, skills: value || ["All"] })}
          isSearchable
          isClearable
          isMulti
        />
      </div>

      <div className={s.field}>
        <label htmlFor="type">Type</label>
        <Select
          name="type"
          options={typeOptions}
          value={typeOptions.find(v => v.label === filterValues.type)}
          onChange={(option) => setFilterValues({ ...filterValues, type: option?.label || "All" })}
          isSearchable
          isClearable
        />
      </div>

      {/* <div className={s.field}>
        <label htmlFor="platform">Platform</label>
        <Select
          name="platform"
          options={platformOptions}
          value={platformOptions.find(v => v.value === filterValues.platform)}
          onChange={(option) => setFilterValues({ ...filterValues, platform: option?.value || "All" })}
          isSearchable
          isClearable
        />
      </div>

      <div className={s.field}>
        <label htmlFor="level">Level</label>
        <Select
          name="level"
          options={levelOptions}
          value={categoryOptions.find(v => v.value === filterValues.level)}
          onChange={(option) => setFilterValues({ ...filterValues, level: option?.value || "All" })}
          isSearchable
          isClearable
        />
      </div> */}

      <div className={s.field}>
        <label>
          <input type="checkbox" value="Worldwide only" onChange={e => setFilterValues({ ...filterValues, ["Worldwide only"]: e.target.checked })} />
          Worldwide only
        </label>
      </div>

      <div className={s.field}>
        <label>
          <input type="checkbox" value="Visa sponsorship" onChange={e => setFilterValues({ ...filterValues, ["Visa sponsorship"]: e.target.checked })} />
          Visa sponsorship
        </label>
      </div>

      {/* <div className={s.field}>
        <label>
          <input type="checkbox" value="givesCertificate" onChange={e => setFilterValues({ ...filterValues, givesCertificate: e.target.checked })} />
          For indie makers
        </label>
      </div> */}
    </div>
  )
}

export default Filters