"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import CourseForm from '../../_components/CourseForm';
import s from './EditCourse.module.scss';

const EditCoursePageClient = ({ currentCourse }) => {
  const router = useRouter()

  const handleSubmit = async (courseData) => {
    const { id, isPaid, ...rest } = courseData;
    const res = await fetch(`/api/courses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });
    if (res.ok) {
      router.push('/courses');
    } else {
      const errorText = await res.text();
      console.log('Error editing course:', errorText);
      alert(errorText);
    }
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/courses/${course.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.push('/courses');
    } else {
      const errorText = await res.text();
      console.log('Error deleting course:', errorText);
      alert(errorText);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Edit the course</h1>
        <div className={s.deleteIcon}>
          <Image src="/trash.svg" alt="Delete course" width={20} height={20} onClick={handleDelete} />
        </div>
      </div>

      <CourseForm onSubmit={handleSubmit} initialValues={currentCourse} />
    </div>
  )
}

export default EditCoursePageClient;