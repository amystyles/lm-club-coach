export type Role = 'coach' | 'gfm' | 'instructor';
export type Grade = 1 | 2 | 3;
export type LMQLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Stage = 1 | 2 | 3 | 4 | 5 | 6;
export type CoachStage = 1 | 2 | 3 | 4 | 5;
export type DeploymentPath = 'A' | 'B' | 'C';

export interface KeyElementGrade {
  element: KeyElement;
  grade: Grade;
  notes?: string;
  lastAssessed?: string;
}

export type KeyElement = 'choreography' | 'technique' | 'coaching' | 'connection' | 'performance';

export interface ProgramEntry {
  name: string;
  lmqLevel: LMQLevel;
}

export interface Instructor {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  programs: ProgramEntry[];
  stage: Stage;
  lmqLevel: LMQLevel;
  grades: KeyElementGrade[];
  priorityElement: KeyElement;
  mentorId?: string;
  clubId: string;
  joinDate: string;
  lastAssessment: string;
  nextAssessment?: string;
  goals: string[];
  riskLevel: 'low' | 'medium' | 'high';
  certDate?: string;
  trustOverrides: Record<string, number>;
}

export interface ClubCoach {
  id: string;
  name: string;
  initials: string;
  coachStage: CoachStage;
  instructorIds: string[];
  clubId: string;
  lmqLevel: LMQLevel;
  programs: string[];
  yearsTeaching: number;
  skillsCompleted: string[];
  tapCoachId?: string;
}

export interface Club {
  id: string;
  name: string;
  region: string;
  deploymentPath: DeploymentPath;
  gfmName: string;
  instructorCount: number;
  coachCount: number;
}

export interface Assessment {
  id: string;
  instructorId: string;
  assessorId: string;
  assessorRole: 'coach' | 'tap' | 'gfm';
  date: string;
  program: string;
  type: 'observation' | 'certification' | 'grade-review' | 'quarterly';
  grades: KeyElementGrade[];
  overallLevel: LMQLevel;
  feedback: string;
  recommendations: string[];
  status: 'scheduled' | 'completed' | 'draft';
}

export interface DevelopmentNote {
  id: string;
  instructorId: string;
  authorId: string;
  date: string;
  keyElement: KeyElement;
  observation: string;
  recommendation: string;
  followUp?: string;
  grade?: Grade;
}

export interface ObservationForm {
  instructorId: string;
  program: string;
  date: string;
  choreography: { grade: Grade; evidence: string; };
  technique: { grade: Grade; evidence: string; };
  coaching: { grade: Grade; evidence: string; };
  connection: { grade: Grade; evidence: string; };
  performance: { grade: Grade; evidence: string; };
  oneThingFocus: string;
  crcConnect: string;
  crcRecommend: string;
  crcCommend: string;
}
