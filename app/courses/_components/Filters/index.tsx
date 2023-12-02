import { useEffect } from 'react';
import Select from '../../../../components/Select';
import { categoryOptions, platformOptions, levelOptions } from '../../constants';
import { Course } from '../../../../types/course';
import s from './Filters.module.scss';

type FiltersProps = {
  courses: Course[];
  filterValues: any;
  setFilterValues: (values: any) => void;
  setFilteredResults: (results: any[]) => void;
}

const Filters = ({ courses, filterValues, setFilterValues, setFilteredResults }: FiltersProps) => {
  useEffect(() => {
    setFilteredResults(courses.filter(v => {
      let match = true;
      if (filterValues.search && !v.title.toLowerCase().includes(filterValues.search.toLowerCase())) {
        match = false;
      }
      if (filterValues.onlyFree && v.price) {
        match = false;
      }
      if (filterValues.givesCertificate && !v.certificate) {
        match = false;
      }
      if (filterValues.platform && filterValues.platform !== "All" && v.platform !== filterValues.platform) {
        match = false;
      }
      if (filterValues.category && filterValues.category !== "All" && v.category !== filterValues.category) {
        match = false;
      }
      if (filterValues.level && filterValues.level !== "All" && v.level !== filterValues.level) {
        match = false;
      }
      return match;
    }))
  }, [filterValues])

  const clearFilters = () => {
    setFilterValues({
      category: "All",
      platform: "All",
      level: "All",
    });
  }
  
  return (
    <div className={s.filters}>
      <div className={s.filtersHeader}>
        <h2>Filters</h2>
        <button onClick={clearFilters}>Clear all</button>
      </div>

      <div className={s.field}>
        <label htmlFor="category">Category</label>
        <Select
          name="category"
          options={categoryOptions}
          value={categoryOptions.find(v => v.value === filterValues.category)}
          onChange={(option) => setFilterValues({ ...filterValues, category: option?.value || "All" })}
          isSearchable
          isClearable
        />
      </div>

      <div className={s.field}>
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
      </div>

      <div className={s.field}>
        <label>
          <input type="checkbox" value="onlyFree" onChange={e => setFilterValues({ ...filterValues, onlyFree: e.target.checked })} />
          Only free
        </label>
      </div>

      <div className={s.field}>
        <label>
          <input type="checkbox" value="givesCertificate" onChange={e => setFilterValues({ ...filterValues, givesCertificate: e.target.checked })} />
          Certificate on completion
        </label>
      </div>
    </div>
  )
}

export default Filters