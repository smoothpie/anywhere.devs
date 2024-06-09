"use client"
import { useRouter } from 'next/navigation'
import JobForm from '../_components/JobForm';
import { JobFormValues } from '@/types/job';
import s from './New.module.scss';

const AddJobPage = () => {
  const router = useRouter();

  const handleSubmit = async (jobData: JobFormValues) => {
    const { isPaid, ...rest } = jobData;
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });
    if (res.ok) {
      router.push('/jobs');
    } else {
      const errorText = await res.text();
      console.log('Error adding job:', errorText);
      alert(errorText);
    }
  }

  return (
    <div className={s.container}>
      <h1>Add a job</h1>

      <JobForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddJobPage;