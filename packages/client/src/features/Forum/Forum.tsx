import type { FC, FormEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Author, Post, Theme } from 'models/forum.model';
import { ForumNewPost, ForumNewTheme } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { forumApi } from 'api/forum.api';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { AxiosResponse } from 'axios';
import { Posts } from './Posts';

import { messages } from './common';

import './Forum.scss';

export const Forum: FC = () => {
    const { formatMessage: fm } = useIntl();

    const [currentTheme, setCurrentTheme] = useState<Theme | false>(false);
    const [newTheme, setNewTheme] = useState('');
    const [themes, setThemes] = useState<Theme[]>([]);
    const [users, setUsers] = useState<Author[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<string>('');

    const handleChangeCurrentTheme = (theme: Theme) => {
        setCurrentTheme(theme);
    };

    const addNewTheme = () => {
        if (!newTheme) return;
        const id = themes[0].id + 1;

        const theme = new ForumNewTheme(newTheme, 1, id);
        setThemes((prev) => [theme, ...prev]);
        setNewTheme('');
    };

    const addNewPost = () => {
        if (!currentTheme || !newPost) return;
        const post = new ForumNewPost(1, newPost, currentTheme.id);
        setPosts((prev) => [...prev, post]);
        setNewPost('');
    };

    const newThemeOnInput = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        setNewTheme(value);
    };

    const newPostOnInput = (e: FormEvent<HTMLTextAreaElement>) => {
        const { value } = e.target as HTMLTextAreaElement;
        setNewPost(value);
    };

    const columns: ColumnsType<Theme> = [
        {
            title: fm(messages.themeLabel),
            dataIndex: 'title',
            key: 'title',
            render: (text: string, obj: Theme) => (
                <div
                    className='theme-name'
                    role="button"
                    tabIndex={0}
                    onClick={() => handleChangeCurrentTheme(obj)}
                    onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === 'Enter') handleChangeCurrentTheme(obj);
                    }}
                >
                    {text}
                </div>
            ),
        },
        {
            title: fm(messages.authorLabel),
            dataIndex: 'userId',
            key: 'userId',
            render: (value: number) =>
                users?.map((item: Author) =>
                    item.id === value ? <span key={item.id}>{item.name}</span> : null,
                ),
        },
    ];

    useEffect(() => {
        forumApi
            .getThemes()
            .then((result) => {
                if (Array.isArray(result?.data)) {
                    setThemes(result?.data.reverse());
                }
            })
            .catch(() => { });
        forumApi
            .getAuthor()
            .then((result) => {
                if (Array.isArray(result?.data)) {
                    setUsers(result?.data);
                }
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (currentTheme === false) {
            return;
        }

        forumApi
            .getPosts(currentTheme?.id)
            .then((result) => {
                if (Array.isArray(result?.data)) {
                    setPosts(result?.data);
                }
            })
            .catch(() => { });
    }, [currentTheme]);

    return (
        <>
            <div className="forum-title">
                <Title level={2} className="theme-title">
                    {fm(messages.title)}
                </Title>
            </div>

            <div className="forum-content">
                <div className="left-side">
                    <div className="theme-list">
                        <div className="new-theme-controls">
                            <Input onInput={newThemeOnInput} value={newTheme} />
                            <Button onClick={addNewTheme} htmlType="submit" type="primary">
                                {fm(messages.createThemeBtn)}
                            </Button>
                        </div>
                        <Table
                            className="theme-list-table"
                            columns={columns}
                            dataSource={themes}
                            pagination={{ pageSize: 6, pageSizeOptions: [], showLessItems: true }}
                        />
                    </div>
                </div>
                <div className="right-side">
                    <div className="current-theme">
                        {currentTheme ? (
                            <>
                                <div className="theme-header">
                                    <Title level={3} className="theme-title">
                                        {fm(messages.themeLabel)}
                                        {currentTheme.title}
                                    </Title>
                                    <Title level={4} className="theme-author">
                                        {fm(messages.authorLabel)}
                                        {users &&
                                            users.map((item) => {
                                                if (item.id === currentTheme.userId) {
                                                    return <span key={item.id}>{item.name} </span>;
                                                }
                                                return false;
                                            })}
                                    </Title>
                                    <p className="theme-body">{currentTheme.body}</p>
                                </div>
                                {posts && <Posts posts={posts} />}

                                <div className="new-post-controls">
                                    <TextArea onInput={newPostOnInput} value={newPost} />
                                    <Button onClick={addNewPost} htmlType="submit" type="primary">
                                        {fm(messages.responseBtn)}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Title level={4} className="theme-title">
                                {' '}
                                {fm(messages.changeTheme)}
                            </Title>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
