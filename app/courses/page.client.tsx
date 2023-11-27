"use client"
import { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Sorter from './_components/Sorter';
import Filters from './_components/Filters';
import CourseCard from './_components/CourseCard';
import { sortOptions } from './constants';
import s from './Courses.module.scss';

const CoursesPageClient = ({ courses }) => {
  const [filterValues, setFilterValues] = useState<any>({});
  const [filteredResults, setFilteredResults] = useState<any[]>(courses);
  const { user } = useUser();
  const isAdmin = user && (user.publicMetadata?.role === 'admin');
  
  return (
    <div className={s.main}>
      <div className={s.header}>
        <h1>Browse coding courses</h1>
        {isAdmin && (
          <Link href="/courses/add">
            <button>Add new</button>
          </Link>
        )}
      </div>
      <div className={s.topBar}>
        <input
          className={s.search}
          placeholder="Search..."
          onChange={e => setFilterValues({ ...filterValues, search: e.target.value })}
        />
        <Sorter filteredResults={filteredResults} setFilteredResults={setFilteredResults} />
        <div className={s.resultsCount}>
          <div className={s.resultsCountNumber}>{filteredResults.length}</div>&nbsp;results
        </div>
      </div>
      <section className={s.content}>
        <Filters
          courses={courses}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setFilteredResults={setFilteredResults}
        />

        <div className={s.courses}>
          {filteredResults.map((course) => (
            <CourseCard key={course.id} course={course} isAdmin={isAdmin} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CoursesPageClient