import type { Post, Topic } from 'models/forum.model';
import type React from 'react';
import { useEffect, useState } from 'react';
import { forumApi } from 'api/forum.api';
import { isArray } from 'helpers';

type HookProps = {
  dependencies?: [] | Array<Topic | null>;
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
