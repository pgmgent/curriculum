export interface Course {
  id: string;
  name: string;
  subName?: string;
  description?: string | undefined | null | TrustedHTML;
  period: number | string;
  semester: number;
  credits: number;  
  contactHoursPerWeek: number;
  learningLineCode: string;
  lecturers?: string[];
  specializationCode?: string;
  tags?: Array<string>;
}

export type Curriculum = {
  courses: Course[];
}