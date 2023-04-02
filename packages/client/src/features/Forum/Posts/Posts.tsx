import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Title from 'antd/es/typography/Title';
import { Post } from 'models/forum.model';
import { messages } from './common';
import { useIntl } from 'react-intl';
import './Posts.scss';

const itemsPerPage = 30;

export const Posts: React.FC<{ posts: Array<Post> }> = ({ posts }) => {
    const { formatMessage: fm } = useIntl();

    const [currentPage, setCurrentPage] = useState(1);
    const maxPages = Math.ceil(posts.length / itemsPerPage);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = posts.slice(start, end);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(maxPages);
    }, [posts]);

    return (
        <ul className='theme-posts'>
            <Pagination className={'theme-posts-paginaton'} current={currentPage} pageSize={itemsPerPage} total={posts.length} onChange={handleChangePage} />
            {currentData.map(({ email, body }, key) => (
                <li key={key} className="post">
                    <Title level={4} className="post-title">{fm(messages.postResponse)} {email}:</Title>
                    <p className="post-body">{body}</p>
                </li>
            ))}
            <Pagination className={'theme-posts-paginaton'} current={currentPage} pageSize={itemsPerPage} total={posts.length} onChange={handleChangePage} />
        </ul>
    );
};