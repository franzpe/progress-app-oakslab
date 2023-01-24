import React, { ChangeEvent } from 'react';

import { MaterialIcon } from 'components/icons/MaterialIcon';
import { CategoryProgress, TasksByCategory } from '../types';
import Checkbox from 'components/checkbox/Checkbox';

type ProgressListItemProps = {
  category: {
    id: number;
    name: string;
  };
  tasksByCategory: TasksByCategory;
  progressByCategory: Record<number, CategoryProgress>;
  onChangeTask: (categoryId: number, taskIdx: number) => (e: ChangeEvent<HTMLInputElement>) => void;
};

const ProgressListItem = ({
  category,
  tasksByCategory,
  progressByCategory,
  onChangeTask
}: ProgressListItemProps) => {
  const showDoneIcon = progressByCategory[category.id] && progressByCategory[category.id].status === 'completed';

  return (
    <li>
      <h2>
        {category.name}
        {showDoneIcon && <MaterialIcon size="big">done</MaterialIcon>}
      </h2>
      <ul>
        {tasksByCategory[category.id].map((t, tIdx) => (
          <li key={t.id}>
            <Checkbox
              label={t.name}
              checked={t.isCompleted}
              onChange={onChangeTask(category.id, tIdx)}
              disabled={!progressByCategory[category.id]}
            />
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ProgressListItem;
