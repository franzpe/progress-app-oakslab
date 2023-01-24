import { delayApi } from 'libs/utils';
import rawData from './data.json';

type Data = typeof rawData;

export type Task = typeof rawData.tasks[0];
export type Category = typeof rawData.categories[0];

const DONE_TASKS_KEY = 'DONE_T';

class API {
  private data: Data;

  constructor() {
    const doneTasksStr = window.localStorage.getItem(DONE_TASKS_KEY);
    const doneTasks = doneTasksStr ? JSON.parse(doneTasksStr) : [];

    this.data = {
      ...rawData,
      tasks: rawData.tasks.map(t => ({ ...t, isCompleted: doneTasks.indexOf(t.id) > -1 }))
    };
  }

  getCategories = async (): Promise<Array<Category>> => {
    await delayApi();

    return this.data.categories;
  };

  getTasks = async (): Promise<Array<Task>> => {
    await delayApi();

    return this.data.tasks;
  };

  updateTask = async (id: number, isCompleted: boolean) => {
    await delayApi();

    const idx = this.data.tasks.findIndex(t => t.id === id);

    if (idx < 0) {
      throw Error('not found');
    }

    this.data.tasks[idx].isCompleted = isCompleted;

    localStorage.setItem(
      DONE_TASKS_KEY,
      JSON.stringify(this.data.tasks.filter(t => t.isCompleted).map(t => t.id))
    );

    return this.data.tasks[idx];
  };
}

export default new API();
