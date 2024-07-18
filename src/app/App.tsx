import { useCallback, useState } from 'react';
import './App.css'
import { CourseCard, CourseDetailsModal } from './components/courses';
import { LearningLinesAsInlineList } from './components/learning-lines';

import dataCurriculum202426 from './data/curriculum_2024_26.json';
import dataLearningLines from './data/learning_lines.json';

function App() {
  const [dataCurriculum] = useState(dataCurriculum202426);
  const [isDetailsModalOpen, setCourseDetailsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenCourseDetailsModal = useCallback((courseId: string) => {
    setSelectedCourse(dataCurriculum.courses.find(c => c.id === courseId));
    setCourseDetailsModalOpen(true);
  }, []);

  const handleCloseCourseDetailsModal = useCallback(() => {
    setCourseDetailsModalOpen(false);
  }, []);
  
  return (
    <>
      <div className="App">
        <CourseDetailsModal 
          isOpen={isDetailsModalOpen}
          onClose={handleCloseCourseDetailsModal}
          data={selectedCourse}
        />
        <main>
          <div className="curriculum">
            <header className="curriculum__header-container">
              <h1 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold text-ahs_black-300">Curriculum Graduaat Programmeren</h1>
            </header>
            <div className="curriculum__courses-container">
              <div className="header__year" style={{ gridColumnStart: "p1", gridColumnEnd: "span 4", gridRowStart: "year" }}><h1>1ste jaar</h1></div>
              <div className="header__year" style={{ gridColumnStart: "p5", gridColumnEnd: "span 4", gridRowStart: "year" }}><h1>2de jaar</h1></div>
              <div className="header__semester" style={{ gridColumnStart: "p1", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 1</div>
              <div className="header__semester" style={{ gridColumnStart: "p3", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 2</div>
              <div className="header__semester" style={{ gridColumnStart: "p5", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 3</div>
              <div className="header__semester" style={{ gridColumnStart: "p7", gridColumnEnd: "span 2", gridRowStart: "sem"}}>Semester 4</div>
              <div className="header__period" style={{ gridColumnStart: "p1", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 1</div>
              <div className="header__period" style={{ gridColumnStart: "p2", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 2</div>
              <div className="header__period" style={{ gridColumnStart: "p3", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 3</div>
              <div className="header__period" style={{ gridColumnStart: "p4", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 4</div>
              <div className="header__period" style={{ gridColumnStart: "p5", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 5</div>
              <div className="header__period" style={{ gridColumnStart: "p6", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 6</div>
              <div className="header__period" style={{ gridColumnStart: "p7", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 7</div>
              <div className="header__period" style={{ gridColumnStart: "p8", gridColumnEnd: "span 1", gridRowStart: "per"}}>Periode 8</div>
              {dataCurriculum && dataCurriculum.courses && dataCurriculum.courses.map((course) =>
                <CourseCard key={course.id} data={{ id: course.id, name: course.name, subName: course.subName, period: course.period, semester: 1, learningLineCode: course.learningLineCode, credits: course.credits, contactHoursPerWeek: course.contactHoursPerWeek, lecturers: course.lecturers, specializationCode: course.specializationCode }} onCourseDetailsOpen={handleOpenCourseDetailsModal} />
              )}
            </div>
            <footer className="curriculum__footer-container">
              <LearningLinesAsInlineList data={dataLearningLines} />
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
