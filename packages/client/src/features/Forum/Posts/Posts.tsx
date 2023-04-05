import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Title from 'antd/es/typography/Title';
import type { Post } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { messages } from './common';

import './Posts.scss';

const ITEMS_PER_PAGE = 30;

export const Posts: React.FC<{ posts: Array<Post> }> = ({ posts }) => {
  const { formatMessage: fm } = useIntl();

  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentData = posts.slice(start, end);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(maxPages);
  }, [posts]);

  return (
    <div className="theme-posts">
      <Pagination
        className="theme-posts-paginaton"
        current={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={posts.length}
        onChange={handleChangePage}
      />
      <ul className="theme-posts">
        {currentData.map(({ email, body, id }) => (
          <li key={id} className="post">
            <Title level={4} className="post-title">
              {fm(messages.postResponse)} {email}:
            </Title>
            <p className="post-body">{body}</p>
          </li>
        ))}
      </ul>
      <Pagination
        className="theme-posts-paginaton"
        current={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={posts.length}
        onChange={handleChangePage}
      />
    </div>
  );
};
