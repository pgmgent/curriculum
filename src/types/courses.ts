export interface Course {
  id: number;
  name: string;
  subName?: string;
  description?: string;
  period: number | string;
  semester: number;
  credits: number;  
  contactHoursPerWeek: number;
  learningLineCode: string;
  lecturers?: string[];
  specializationCode?: string;
}