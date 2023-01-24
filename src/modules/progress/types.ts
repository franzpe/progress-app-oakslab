import { Category, Task } from 'api/api';

export type ProgressStatus = 'in-progress' | 'completed' | undefined;

export type CategoryProgress = { categoryId: number; status: ProgressStatus };

export type TasksByCategory = Record<number, Array<Task>>;

export type GetQueryData = { categories: Array<Category>; tasksByCategory: TasksByCategory };
