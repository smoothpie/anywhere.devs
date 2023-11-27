import CoursesPageClient from "./page.client";

async function getCourses() {
  const res = await fetch(`${process.env.CLIENT_URL}/api/courses`, { cache: 'no-store' });

  if (res.ok) {
    const courses = await res.json();
    return courses;
  } else {
    const errorText = await res.text();
    console.log("Error fetching courses:", errorText);
    throw new Error("Error fetching courses");
  }
}

const CoursesPage = async () => {
  const courses = await getCourses()
  
  return (
    <CoursesPageClient courses={courses} />
  )
}

export default CoursesPage