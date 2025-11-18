import { api } from './api';
import { PlannerTask } from '../types/planner';

export async function getTasks(): Promise<PlannerTask[]> {
  const response = await api.get<PlannerTask[]>('/tasks');
  return response.data;
}

export async function createTask(
  task: Omit<PlannerTask, 'id'>,
): Promise<PlannerTask> {
  const response = await api.post<PlannerTask>('/tasks', task);
  return response.data;
}
