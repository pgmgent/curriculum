import { Course } from '../../../types/courses';

export type DetailsProps<T> = {
  className?: string;
  children?: React.ReactNode;
  data: T
};

export const CourseDetails = (props: DetailsProps<Course>): JSX.Element => {
  return (
    <>
      <article className={`course-details course-details--${props.data.learningLineCode}`} data-specializationcode={props.data.specializationCode}>
        <header className="course-details__header">
        </header>
        <div className="course-details__content">
        </div>
        <footer className="course-details__footer">
        </footer>
      </article>
    </>
  );
}