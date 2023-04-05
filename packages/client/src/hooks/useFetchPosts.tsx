import type { Post, Theme } from 'models/forum.model';
import type React from 'react';
import { useEffect, useState } from 'react';
import { forumApi } from 'api/forum.api';
import { isArray } from '../helpers/isArray';

type HookProps = {
  dependencies?: [] | Array<Theme | null>;
};

export const useFetchPosts = ({
  dependencies = [],
}: HookProps): [Array<Post>, React.Dispatch<React.SetStateAction<Array<Post>>>] => {
  const [state, setState] = useState<Array<Post>>([]);

  useEffect(() => {
    forumApi
      .getPosts()
      .then(({ data = [] }: { data: [] | Array<Post> }) => {
        if (isArray(data)) {
          setState(data);
        }
      })
      .catch(() => {});
  }, dependencies);
  return [state, setState];
};
