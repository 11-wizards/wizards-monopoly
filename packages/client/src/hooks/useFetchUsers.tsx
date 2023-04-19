import type { Author } from 'models/forum.model';
import type React from 'react';
import { useEffect, useState } from 'react';
import { forumApi } from 'api/forum.api';
import { isArray } from 'helpers';

export const useFetchUsers = (): [
  Array<Author>,
  React.Dispatch<React.SetStateAction<Array<Author>>>,
] => {
  const [state, setState] = useState<Array<Author>>([]);

  useEffect(() => {
    forumApi
      .getAuthor()
      .then(({ data = [] }: { data: [] | Array<Author> }) => {
        if (isArray(data)) {
          setState(data);
        }
      })
      .catch(() => {});
  }, []);

  return [state, setState];
};
