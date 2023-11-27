import EditCoursePageClient from "./page.client";

async function getCourse(id) {
  const res = await fetch(`${process.env.CLIENT_URL}/api/courses/${id}`, { cache: 'no-store' });

  if (res.ok) {
    const course = await res.json();
    return course;
  } else {
    const errorText = await res.text();
    console.log("Error fetching course:", errorText);
    throw new Error("Error fetching course");
  }
}

const EditCoursePage = async ({ params }) => {
  const currentCourse = await getCourse(params.courseId);
  
  return (
    <EditCoursePageClient currentCourse={currentCourse} />
  )
}

export default EditCoursePage