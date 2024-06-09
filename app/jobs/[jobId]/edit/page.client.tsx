"use client"
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import JobForm from '../../_components/JobForm';
import s from './EditJob.module.scss';
import { Job, JobFormValues } from '@/types/job';

type EditJobProps = {
  currentJob: Job;
}

const EditJobPageClient = ({ currentJob }: EditJobProps) => {
  const router = useRouter()

  const handleSubmit = async (jobData: JobFormValues) => {
    const { id, isPaid, ...rest } = jobData;
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest),
    });
    if (res.ok) {
      router.push('/jobs');
    } else {
      const errorText = await res.text();
      console.log('Error editing job:', errorText);
      alert(errorText);
    }
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/jobs/${currentJob.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      router.push('/jobs');
    } else {
      const errorText = await res.text();
      console.log('Error deleting job:', errorText);
      alert(errorText);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Edit the job</h1>
        <div className={s.deleteIcon}>
          <Image src="/trash.svg" alt="Delete job" width={20} height={20} onClick={handleDelete} />
        </div>
      </div>

      <JobForm onSubmit={handleSubmit} initialValues={currentJob} />
    </div>
  )
}

export default EditJobPageClient;