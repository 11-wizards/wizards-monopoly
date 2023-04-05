import type { Theme } from 'models/forum.model';
import type React from 'react';
import { useEffect, useState } from 'react';
import { forumApi } from 'api/forum.api';
import { isArray } from '../helpers/isArray';

export const useFetchThemes = (): [
  Array<Theme>,
  React.Dispatch<React.SetStateAction<Array<Theme>>>,
] => {
  const [state, setState] = useState<Array<Theme>>([]);

  useEffect(() => {
    forumApi
      .getThemes()
      .then(({ data = [] }: { data: [] | Array<Theme> }) => {
        if (isArray(data)) {
          setState(data);
        }
      })
      .catch(() => {});
  }, []);
  return [state, setState];
};
