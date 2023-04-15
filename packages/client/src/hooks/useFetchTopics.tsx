import type { Topic } from 'models/forum.model';
import type React from 'react';
import { useEffect, useState } from 'react';
import { forumApi } from 'api/forum.api';
import { isArray } from 'helpers';

export const useFetchTopics = (): [
  Array<Topic>,
  React.Dispatch<React.SetStateAction<Array<Topic>>>,
] => {
  const [state, setState] = useState<Array<Topic>>([]);

  useEffect(() => {
    forumApi
      .getTopics()
      .then(({ data = [] }: { data: [] | Array<Topic> }) => {
        if (isArray(data)) {
          setState(data);
        }
      })
      .catch(() => {});
  }, []);
  return [state, setState];
};
