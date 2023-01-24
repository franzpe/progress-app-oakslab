import { useEffect, useState } from 'react';

import api from 'api/api';
import { GetQueryData } from '../types';

export const useGetDataQuery = () => {
  const [data, setData] = useState<GetQueryData>({
    categories: [],
    tasksByCategory: {}
  });

  const [status, setStatus] = useState<'pending' | 'rejected' | 'fulfilled'>();

  useEffect(() => {
    setStatus('pending');

    (async () => {
      try {
        const [categories, tasks] = await Promise.all([api.getCategories(), api.getTasks()]);

        setData({
          categories,
          tasksByCategory: categories.reduce(
            (obj, key) => ({ ...obj, [key.id]: tasks.filter(t => t.categoryId === key.id) }),
            {}
          )
        });

        setStatus('fulfilled');
      } catch (err) {
        setStatus('rejected');
      }
    })();
  }, []);

  const isLoading = status === 'pending' || status === undefined;
  const isSuccess = status === 'fulfilled';

  return { data, setData, isLoading, isSuccess };
};
