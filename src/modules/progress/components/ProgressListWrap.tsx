import api from 'api/api';
import { showBasicConfirmAlert } from 'components/confirmAlert/showAlert';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetDataQuery } from '../hooks/useGetDataQuery';
import { CategoryProgress, TasksByCategory } from '../types';
import ProgressList from './ProgressList';

const ProgressListWrap = () => {
  const { data, setData, isLoading, isSuccess } = useGetDataQuery();
  const [progressByCategory, setProgressByCategory] = useState<Record<number, CategoryProgress>>({});
  const [finalMessage, setFinalMessage] = useState('');

  const completed = useMemo(
    () =>
      data.categories.length === Object.values(progressByCategory).filter(v => v.status === 'completed').length,
    [progressByCategory, data.categories.length]
  );

  useEffect(() => {
    if (completed && !finalMessage) {
      fetch('https://uselessfacts.jsph.pl/random.json')
        .then(response => response.json())
        .then(data => setFinalMessage(data.text));
    }
  }, [progressByCategory, completed, finalMessage]);

  const recordProgress = useCallback(() => {
    let progress: Record<number, CategoryProgress> = {};

    for (const category of data.categories) {
      const done = data.tasksByCategory[category.id].filter(t => !t.isCompleted).length === 0;

      progress = {
        ...progress,
        [category.id]: { categoryId: category.id, status: done ? 'completed' : 'in-progress' }
      };

      if (!done) {
        break;
      }
    }

    setProgressByCategory(progress);
  }, [data.categories, data.tasksByCategory]);

  useEffect(() => {
    if (isSuccess) {
      recordProgress();
    }
  }, [isSuccess, data, recordProgress]);

  const handleTaskChange = (categoryId: number, taskIdx: number) => async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    const updateData = async (tasksByCategory: TasksByCategory) => {
      setData({ ...data, tasksByCategory });

      try {
        await api.updateTask(data.tasksByCategory[categoryId][taskIdx].id, checked);
      } catch (err) {
        // Reconcile
      }
    };

    // Undo a task of completed step
    if (!checked && progressByCategory[categoryId].status === 'completed') {
      showBasicConfirmAlert({
        title: 'Are you sure?',
        message: 'You want to undo a task? Progress made in next stages will be erased.',
        onConfirm: () => {
          const tasksByCategorySlice = { ...data.tasksByCategory };
          tasksByCategorySlice[categoryId][taskIdx].isCompleted = checked;

          for (const key of Object.keys(tasksByCategorySlice)) {
            if (Number(key) <= categoryId) continue;

            tasksByCategorySlice[Number(key)].forEach(t => (t.isCompleted = false));
          }

          updateData(tasksByCategorySlice);
        }
      });
    } else {
      const tasksSlice = [...data.tasksByCategory[categoryId]];
      tasksSlice[taskIdx].isCompleted = checked;
      updateData({ ...data.tasksByCategory, [categoryId]: tasksSlice });
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <ProgressList
      data={data}
      finalMessage={finalMessage}
      completed={completed}
      onChangeTask={handleTaskChange}
      progressByCategory={progressByCategory}
    />
  );
};

export default ProgressListWrap;
