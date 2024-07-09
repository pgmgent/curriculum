import { Course } from '../../../types/courses';
import dataLecturers from '../../data/lecturers.json';

export type CardProps<T> = {
  className?: string;
  children?: React.ReactNode;
  data: T
};

const getGridColumnStart = (period: number | string): string => {
  if (typeof period === "number") {
    return `p${period}`;
  } else {
    const periodes = period.split("+");
    return `p${periodes[0]}`;
  }
}

const getGridColumnEnd = (period: number | string): string => {
  if (typeof period === "number") {
    return `p${period + 1}`;
  } else {
    const periodes = period.split("+");
    console.log(periodes);
    return `p${parseInt(periodes[1]) + 1}`;
  }
}

const getLecturer = (lecturerCode: string): string => {
  const lecturer = dataLecturers.find(l => l.code === lecturerCode);
  if (lecturer) {
    return lecturer.name;
  } else {
    return "Nog niet gekend";
  }
}

export const CourseCard = (props: CardProps<Course>): JSX.Element => {
  return (
    <>
      <div className={`course course--${props.data.learningLineCode}`} style={{ gridColumnStart: getGridColumnStart(props.data.period), gridColumnEnd: getGridColumnEnd(props.data.period), gridRowStart: props.data.learningLineCode }} data-specializationcode={props.data.specializationCode}>
        <header className="course__header">
          <span className="course__header-icon"></span>
          <span className="course__lecturers">
            {props.data.lecturers && props.data.lecturers.map((lecturerCode, index) => {
              return <span className="lecturer" key={index}><abbr title={getLecturer(lecturerCode)}>{lecturerCode}</abbr></span>
            })}
          </span>
        </header>
        <div className="course__content">
          <h3 className="course__name">{props.data.name}</h3>
          <h4 className="course__sub-name">{props.data.subName}</h4>
        </div>
        <footer className="course__footer">
          <span className="course__credits">{props.data.credits}<abbr title="studiepunten">sp</abbr></span>
          <span className="course__contact-hours-per-week">{props.data.contactHoursPerWeek}<abbr title="uren per week">u/w</abbr></span>
        </footer>
      </div>
    </>
  );
}