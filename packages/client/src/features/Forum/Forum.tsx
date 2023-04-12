import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import type { Author, Theme } from 'models/forum.model';
import { ForumNewPost, ForumNewTheme } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { useFetchPosts, useFetchThemes, useFetchUsers } from 'hooks';
import { Posts } from './Posts';
import { messages } from './common';

import './Forum.scss';



export const Forum: FC = () => {
  const { formatMessage: fm } = useIntl();

  const [currentTheme, setCurrentTheme] = useState<Nullable<Theme>>(null);
  const [newTheme, setNewTheme] = useState<string>('');
  const [newPost, setNewPost] = useState<string>('');

  const [themes, setThemes] = useFetchThemes();
  const [users] = useFetchUsers();

  const [posts, setPosts] = useFetchPosts({
    dependencies: [currentTheme],
  });

  const handleChangeCurrentTheme = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const addNewTheme = () => {
    if (!newTheme) return;

    const firstThemeId: number = typeof themes[0]?.id === 'number' ? themes[0]?.id : 0;
    const newThemeId: number = firstThemeId + 1;

    const theme = new ForumNewTheme(newTheme, 1, newThemeId);
    setThemes((prev: Array<Theme>) => [theme, ...prev]);
    setNewTheme('');
  };

  const addNewPost = () => {
    if (!currentTheme || !newPost) return;
    const post = new ForumNewPost(1, newPost, currentTheme.id);
    setPosts((prev: Array<ForumNewPost>) => [...prev, post]);
    setNewPost('');
  };

  const addThemeOnInput = (e: FormEvent<HTMLInputElement>) => {
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
        <button type="button" className="theme-name" onClick={() => handleChangeCurrentTheme(obj)}>
          {text}
        </button>
      ),
    },
    {
      title: fm(messages.authorLabel),
      dataIndex: 'userId',
      key: 'userId',
      render: (value: number) =>
        users?.map((item: Author) =>
          item.id === value ? <span key={item.id}>{item.name}</span> : null,
        ) || null,
    },
  ];

  return (
    <div className="forum-content">
      <div className="forum-title">
        <Title level={2} className="theme-title">
          {fm(messages.title)}
        </Title>
      </div>
      <div className="left-side">
        <div className="theme-change">
          <div className="new-theme-controls">
            <Input onInput={addThemeOnInput} value={newTheme} />
            <Button onClick={addNewTheme} htmlType="submit" type="primary">
              {fm(messages.createThemeBtn)}
            </Button>
          </div>
          <Table
            className="theme-change-table"
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
                      if (item?.id === currentTheme?.userId) {
                        return <span key={item?.id}>{item?.name} </span>;
                      }
                      return false;
                    })}
                </Title>
                <p className="theme-body">{currentTheme.body}</p>
              </div>
              {posts && <Posts posts={posts} />}

              <div className="new-post-controls">
                <TextArea onInput={newPostOnInput} value={newPost} className="new-post-body" />
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
  );
};
