import Link from "next/link";
import Image from 'next/image';
import { shortenDescription, formatPrice } from '../../utils';
import { categoryOptions } from '../../constants';
import s from './CourseCard.module.scss';

const CourseCard = ({ course, isAdmin }) => {
  const categoryLabel = categoryOptions.find((option) => option.value === course.category)?.label;
  return (
    <Link href={course.link || "/"} target="_blank">
      <article className={s.courseContainer}>
        {isAdmin && (
          <div className={s.adminToolbar}>
            <Link href={`/courses/${course.id}/edit`}>
              <Image src="/edit.svg" alt="edit" width={20} height={20} />
            </Link>
          </div>
        )}
        <div className={s.course}>
          <h3>{course.title}</h3>
          <p>{course.description ? shortenDescription(course.description) : '-'}</p>
          <div className={s.price}><strong>Price:</strong> {formatPrice(course.price)}</div>
          <div className={s.footer}>
            <div className={s.tag}>{categoryLabel}</div>
            {course.author && <div className={s.tag}>{course.author}</div>}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default CourseCard