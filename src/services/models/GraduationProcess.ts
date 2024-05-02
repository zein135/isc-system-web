export interface InitGraduationProcess {
  studentId: string;
  studentCode: string;
  modeId: string;
  period: string;
  titleProject: string;
}

export interface InitGraduationProcessDB {
  student_id: string;
  student_code?: string;
  modality_id: string;
  period: string;
  project_name: string;
}
