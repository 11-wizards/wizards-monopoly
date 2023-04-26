import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Post } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  ITEMS_PER_PAGE,
  selectCurrentPage,
  selectCurrentPageData,
  selectMaxPages,
  setCurrentPage,
} from 'app/slices/forumSlice';
import { messages } from './common';

import './Posts.scss';

export const Posts: React.FC<{ posts: Array<Post> }> = ({ posts }) => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectCurrentPage);
  const maxPages = useAppSelector(selectMaxPages);
  const currentPosts = useAppSelector(selectCurrentPageData);

  const handleChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(setCurrentPage(maxPages));
  }, [posts]);

  return (
    <div className="topic-posts">
      <Pagination
        className="topic-posts-paginaton"
        current={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={posts.length}
        onChange={handleChangePage}
      />
      <ul className="topic-posts">
        {currentPosts.map(({ email, body, id }) => (
          <li key={id} className="post">
            <Title level={4} className="post-title">
              {fm(messages.postResponse)} {email}:
            </Title>
            <p className="post-body">{body}</p>
          </li>
        ))}
      </ul>
      <Pagination
        className="topic-posts-paginaton"
        current={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={posts.length}
        onChange={handleChangePage}
      />
    </div>
  );
};
