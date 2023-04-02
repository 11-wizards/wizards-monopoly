import { FC, FormEvent, useEffect, useState } from 'react';
import { Author, ForumNewPost, ForumNewTheme, Post, Theme } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { forumApi } from 'api/forum.api';
import { Posts } from './Posts/';
import { Button, Input, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import './Forum.scss';

import { messages } from './common';

export const Forum: FC = () => {

    const { formatMessage: fm } = useIntl();

    const columns: ColumnsType<Theme> = [
        {
            title: fm(messages.themeLabel),
            dataIndex: 'title',
            key: 'title',
            render: (text: string, obj: Theme) => {
                return <a onClick={() => handleChangeCurrentTheme(obj)}>{text}</a>
            },
        },
        {
            title: fm(messages.authorLabel),
            dataIndex: 'userId',
            key: 'userId',
            render: (value: number) => {
                return users.map((item: Author, key: number) => item.id === value ? <span key={value}>{item.name}</span> : <span key={value}></span>)
            },
        }

    ];

    const [currentTheme, setCurrentTheme] = useState<Theme | false>(false);
    const [newTheme, setNewTheme] = useState<string>('');
    const [themes, setThemes] = useState<Theme[]>([]);
    const [users, setUsers] = useState<Author[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<string>('');

    const handleChangeCurrentTheme = (theme: Theme) => {
        setCurrentTheme(theme);
    }

    const addNewTheme = () => {
        if (!newTheme) return;
        const id = themes[0]?.id + 1 ?? 0;
        const theme = new ForumNewTheme(newTheme, 1, id);
        setThemes(prev => [theme, ...prev]);
        setNewTheme('');
    }

    const addNewPost = () => {
        if (!currentTheme || !newPost) return;
        const post = new ForumNewPost(1, newPost, currentTheme.id);
        setPosts(prev => [...prev, post]);
        setNewPost('');
    }

    const newThemeOnInput = (e: FormEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        setNewTheme(value);
    }

    const newPostOnInput = (e: FormEvent<HTMLTextAreaElement>) => {
        const value = (e.target as HTMLTextAreaElement).value;
        setNewPost(value);
    }

    useEffect(() => {
        forumApi.getThemes()
            .then(result => {
                const { data } = result;
                if (Array.isArray(data)) {
                    setThemes(data.reverse());
                }
            })
        forumApi.getAuthor()
            .then(result => {
                const { data } = result;
                if (Array.isArray(data)) {
                    setUsers(data);
                }
            })
    }, []);

    useEffect(() => {
        if (currentTheme === false) return;
        forumApi.getPosts(currentTheme?.id)
            .then(result => {
                const { data } = result;
                if (Array.isArray(data)) {
                    setPosts(data);
                }
            })
    }, [currentTheme]);

    return (
        <>
            <div className='forum-title'>
                <Title level={2} className="theme-title">
                    {fm(messages.title)}
                </Title>
            </div>

            <div className='forum-content'>
                <div className="left-side">
                    <div className="theme-list">
                        <div className='new-theme-controls'>
                            <Input onInput={newThemeOnInput} value={newTheme} />
                            <Button onClick={addNewTheme} htmlType="submit" type="primary" >
                                {fm(messages.createThemeBtn)}
                            </Button>
                        </div>
                        <Table className='theme-list-table' columns={columns} dataSource={themes} pagination={{ pageSize: 6, pageSizeOptions: [], showLessItems: true }} />
                    </div>
                </div>
                <div className="right-side">
                    <div className="current-theme">
                        {
                            currentTheme ?
                                <>
                                    <div className="theme-header">
                                        <Title level={3} className="theme-title">
                                            {fm(messages.themeLabel)}{currentTheme.title}
                                        </Title>
                                        <Title level={4} className="theme-author">
                                            {fm(messages.authorLabel)}
                                            {users && users.map((item, key) => {
                                                if (item.id === currentTheme.userId) {
                                                    return <span key={key}>{item.name} </span>;
                                                }
                                            })}</Title>
                                        <p className='theme-body'>{currentTheme.body}</p>
                                    </div>
                                    {posts && <Posts posts={posts} />}

                                    <div className='new-post-controls'>
                                        <TextArea onInput={newPostOnInput} value={newPost} />
                                        <Button onClick={addNewPost} htmlType="submit" type="primary">
                                            {fm(messages.responseBtn)}
                                        </Button>
                                    </div>
                                </> : <Title level={4} className="theme-title" > {fm(messages.changeTheme)}</Title>
                        }
                    </div>
                </div>
            </div >

        </>
    )
}