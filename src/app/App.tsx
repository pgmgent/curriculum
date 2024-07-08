import './App.css'
import { CourseCard } from './components/courses';

import dataCurriculum from './data/curriculum_2024_26.json';

function App() {
  return (
    <>
      <div className="App">
        <main>
          <div className="curriculum">
            <header className="curriculum__header-container">
              <h1 className="text-3xl font-bold underline">Curriculum academiejaar 2024-25</h1>
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
              {dataCurriculum && dataCurriculum.courses && dataCurriculum.courses.map((course, index) =>
                <CourseCard key={index} data={{ id: 1, name: course.name, subName: course.subName, period: course.period, semester: 1, learningLineCode: course.learningLineCode, credits: course.credits, contactHoursPerWeek: course.contactHoursPerWeek, lecturers: course.lecturers, specializationCode: course.specializationCode }} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
