import { ChangeEvent } from 'react';
import { CategoryProgress, GetQueryData } from '../types';
import ProgressListItem from './ProgressListItem';

type ProgressListProps = {
  completed: boolean;
  finalMessage: string;
  data: GetQueryData;
  progressByCategory: Record<number, CategoryProgress>;
  onChangeTask: (categoryId: number, taskIdx: number) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const ProgressList = ({ completed, finalMessage, data, progressByCategory, onChangeTask }: ProgressListProps) => {
  return (
    <section>
      {completed && finalMessage && (
        <p>
          <b>{finalMessage}</b>
        </p>
      )}
      <ol>
        {data?.categories?.map(c => (
          <ProgressListItem
            key={c.id}
            tasksByCategory={data.tasksByCategory}
            category={c}
            onChangeTask={onChangeTask}
            progressByCategory={progressByCategory}
          />
        ))}
      </ol>
    </section>
  );
};

export default ProgressList;
