export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface PlannerTask {
  id: string;
  title: string;
  description?: string;
  date: string; // yyyy-mm-dd
  time?: string; // hh:mm
  status: TaskStatus;
  category?: string;
}
