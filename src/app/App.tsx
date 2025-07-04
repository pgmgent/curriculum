import { useCallback, useEffect, useState } from 'react';
import {Helmet} from 'react-helmet';

import './App.css'
import { CourseCard, CourseDetailsModal } from './components/courses';
import { LearningLinesAsInlineList } from './components/learning-lines';
import { Course, Curriculum } from '../types/courses'

import dataCurricula from './data/curricula.json';
import dataCurriculum202425 from './data/curriculum_2024_25.json';
import dataCurriculum202426 from './data/curriculum_2024_26.json';
import dataCurriculum202526 from './data/curriculum_2025_26.json';
import dataCurriculum202527 from './data/curriculum_2025_27.json';
import dataLearningLines from './data/learning_lines.json';
import dataSpecializations from './data/specializations.json';

const META_TITLE = `Curriculum | Graduaat Programmeren | Arteveldehogeschool`;
const META_DESCRIPTION = `Leer apps, websites en desktopapplicaties ontwikkelen in het Graduaat Programmeren. Integreer databanken, cloud & AI-services. Ideaal voor doeners met passie voor digitale technologie en programmeren.`;

function App() {
  const [dataCurriculum, setDataCurriculum] = useState<Curriculum>(dataCurriculum202527);
  const [dataFilteredCurriculum, setDataFilteredCurriculum] = useState<Curriculum>(dataCurriculum);
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [isDetailsModalOpen, setCourseDetailsModalOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null | undefined>(null);
  const [keywords, setKeywords] = useState<string[]>([]); 

  useEffect(() => {
    const tempKeywords = new Set<string>();
    dataCurriculum202527.courses.forEach((course) => {
      if (course.tags && course.tags.length > 0) {
        course.tags.forEach((tag) => {
          tempKeywords.add(tag);
        });
      }
    });
    setKeywords(Array.from(tempKeywords));
  }, [dataCurriculum202527]);

  const handleOpenCourseDetailsModal = useCallback((courseId: string) => {
    setSelectedCourse(dataCurriculum.courses.find(c => c.id === courseId));
    setCourseDetailsModalOpen(true);
  }, []);

  const handleCloseCourseDetailsModal = useCallback(() => {
    setCourseDetailsModalOpen(false);
  }, []);

  const handleChangeCurriculum = useCallback((ev: any) => {
    switch (ev.target.value) {
      case "Curriculum 2025-27": default: setDataCurriculum(dataCurriculum202527); break;
      case "Curriculum 2025-26": setDataCurriculum(dataCurriculum202526); break;
      case "Curriculum 2024-26": setDataCurriculum(dataCurriculum202426); break;
      case "Curriculum 2024-25": setDataCurriculum(dataCurriculum202425); break;
    }
  }, []);

  const handleChangeSpecialization = useCallback((ev: any) => {
    setSelectedSpecialization(ev.target.value);
  }, []);

  useEffect(() => {
    const filteredCurriculum = { ...dataCurriculum};  

    if (selectedSpecialization !== "all") {
      filteredCurriculum.courses = filteredCurriculum.courses.filter((course) => course.hasOwnProperty('specializationCode') && course["specializationCode"] === selectedSpecialization || !course.hasOwnProperty('specializationCode'));
    }

    setDataFilteredCurriculum(filteredCurriculum);
  }, [dataCurriculum, selectedSpecialization]);
  
  return (
    <>
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{META_TITLE}</title>
          <link rel="canonical" href="http://www.pgm.gent/curriculum" />
          <meta name="description" content={META_DESCRIPTION} />
          <meta name="keywords" content={keywords.join(", ")} />
          <meta property="og:url" content="https://www.pgm.gent/curriculum/" />
          <meta property="og:site_name" content={META_TITLE} />
          <meta property="og:locale" content="nl_BE" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={META_TITLE} />
          <meta property="og:description" content={META_DESCRIPTION} />
          <meta property="og:image" content="https://www.pgm.gent/curriculum/pgm.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Studenten tijdens werkplekleren | Graduaat Programmeren" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="pgm.gent" />
          <meta property="twitter:url" content="https://www.pgm.gent/curriculum/" />
          <meta property="twitter:title" content={META_TITLE} />
          <meta property="twitter:description" content={META_DESCRIPTION} />
          <meta property="twitter:image" content="https://www.pgm.gent/curriculum/pgm.jpg" />
        </Helmet>
        <div className={`flex flex-row flex-wrap items-center justify-end p-2`}>
          <select onChange={(ev) => handleChangeCurriculum(ev)} className={`bg-gray-50 border border-ahs_blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-ahs_blue-500 dark:focus:border-ahs_blue-500 mx-2`}>
            {dataCurricula.map((curriculum, index) => <option key={index} value={curriculum.label}>{curriculum.label}</option>)}
          </select>
          <select onChange={(ev) => handleChangeSpecialization(ev)} className={`bg-gray-50 border border-ahs_blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-ahs_blue-500 dark:focus:border-ahs_blue-500 mx-2`}>
            <option value="all">Alle specialisaties</option>
            {dataSpecializations.map((specialization) => <option key={specialization.code} value={specialization.code}>{specialization.name}</option>)}
          </select>
        </div>
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
              {dataFilteredCurriculum && dataFilteredCurriculum.courses && dataFilteredCurriculum.courses.map((course) =>
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
