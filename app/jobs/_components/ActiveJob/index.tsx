import Link from "next/link";
import Image from 'next/image';
import { shortenDescription, formatPrice } from '../../utils';
import { categoryOptions } from '../../constants';
import jobs from '../../../../data/jobs.json';
import { Job } from '../../../../types/job';
import s from './ActiveJob.module.scss';

type ActiveJobProps = {
  job: any;
  isAdmin?: boolean;
}

const ActiveJob = ({ job, isAdmin }: any) => {
  console.log(job, 'JOBBB')
  return (
    <article className={s.courseContainer}>
      {/* {isAdmin && (
        <div className={s.adminToolbar}>
          <Link href={`/courses/${course.id}/edit`}>
            <Image src="/edit.svg" alt="edit" width={20} height={20} />
          </Link>
        </div>
      )} */}
      <div className={s.course}>
        <Image src={job?.company?.logo} alt={job.title} width={100} height={100} />
        <h3>{job.title}</h3>
        <p>{job?.description ? job.description : '-'}</p>
        <div className={s.price}><strong>Location:</strong> {job.remoteIn}</div>
        <div className={s.price}><strong>Salary:</strong> {job.salary}</div>
        <div className={s.price}>
          <strong>Company:{' '}</strong>
          <Link href={`/companies/${job?.company?.id}`} target="_blank">{job?.company?.name}</Link>
        </div>
        {job?.company?.description && (
          <div className={s.price}><strong>Company description:</strong> {job?.company?.description}</div>
        )}
        {/* <div className={s.price}><strong>Department:</strong> {course["Department"]}</div> */}
        <div className={s.footer}>
          <div className={s.tags}>
            {/* {course.tags?.map((tag: string) => (
              <div key={tag} className={s.tag}>{tag}</div>
            ))} */}
            <div className={s.tag}>{job.type}</div>
            {job.remoteIn === "TRUE" && <div className={s.tag}>Remote possible</div>}
            {job?.visaSponsorship === "TRUE" && <div className={s.tag}>Visa sponsorship</div>}
          </div>
        </div>
        <Link href={job.link} target="_blank" className={s.apply}>
          <button>Apply</button>
        </Link>
      </div>
    </article>
  )
}

export default ActiveJob