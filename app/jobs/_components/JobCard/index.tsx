import Link from "next/link";
import Image from 'next/image';
import { shortenDescription, formatPrice } from '../../utils';
import { categoryOptions } from '../../constants';
import { Job } from '../../../../types/job';
import s from './JobCard.module.scss';

type JobCardProps = {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  return (
    <article className={s.jobContainer} onClick={() => onClick(job)}>
      <div className={s.job}>
        <div className={s.jobImage}>
          <Image src={job?.company?.logo} alt={job.title} width={100} height={100} />
        </div>
        <div className={s.jobText}>
          <span>{job.company?.name}</span>
          <h3>{job.title}</h3>
          {/* <p>{job["Description"] ? shortenDescription(job["Description"]) : '-'}</p> */}
          {/* <div className={s.price}>
            <strong>Location:</strong> {job["Location"]}
          </div> */}
          {/* <div className={s.price}><strong>Department:</strong> {job["Department"]}</div> */}
          {/* <div className={s.price}><strong>Location:</strong> {job["Location"]}</div> */}
          <div className={s.footer}>
            <div className={s.tags}>
              {/* {job.tags?.map((tag: string) => (
                <div key={tag} className={s.tag}>{tag}</div>
              ))} */}
              <div className={s.tag}>{job.type}</div>
              {job.remoteIn === "TRUE" && <div className={s.tag}>Remote possible</div>}
              {job.visaSponsorship && <div className={s.tag}>Visa sponsorship</div>}
            </div>
          </div>
        </div>
        <p className={s.jobDate}>6d ago</p>
      </div>
    </article>
  )
}

export default JobCard