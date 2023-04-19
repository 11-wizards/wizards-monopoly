import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import type { Author, Topic } from 'models/forum.model';
import { useIntl } from 'react-intl';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Posts } from './Posts';
import { messages } from './common';
import {
  addNewPost,
  addNewTopic,
  fetchPosts,
  fetchTopics,
  selectAuthors,
  selectCurrentTopic,
  selectPosts,
  selectTopics,
  setCurrentTopic,
} from '../../app/slices/forumSlice';

import './Forum.scss';

export const Forum: FC = () => {
  const { formatMessage: fm } = useIntl();

  const dispatch = useAppDispatch();

  const currentTopic = useAppSelector(selectCurrentTopic);
  const topics = useAppSelector(selectTopics);
  const authors = useAppSelector(selectAuthors);
  const posts = useAppSelector(selectPosts);

  const [newTopicName, setNewTopicName] = useState<string>('');
  const [newPostName, setNewPostName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchPosts());
  }, []);

  const handleChangeCurrentTopic = (topic: Topic) => {
    dispatch(setCurrentTopic(topic));
  };

  const handleAddNewTopic = () => {
    if (!newTopicName) return;
    dispatch(addNewTopic(newTopicName));
    setNewTopicName('');
  };

  const handleAddNewPost = () => {
    if (!newPostName) return;
    dispatch(addNewPost(newPostName));
    setNewPostName('');
  };

  const handleNewTopicNameInput = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewTopicName(value);
  };

  const handleNewPostNameInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    setNewPostName(value);
  };

  const columns: ColumnsType<Topic> = [
    {
      title: fm(messages.topicLabel),
      dataIndex: 'title',
      key: 'title',
      render: (text: string, obj: Topic) => (
        <button type="button" className="topic-name" onClick={() => handleChangeCurrentTopic(obj)}>
          {text}
        </button>
      ),
    },
    {
      title: fm(messages.authorLabel),
      dataIndex: 'userId',
      key: 'userId',
      render: (value: number) =>
        authors?.map((item: Author) =>
          item.id === value ? <span key={item.id}>{item.name}</span> : null,
        ) || null,
    },
  ];

  return (
    <div className="forum-content">
      <div className="forum-title">
        <Title level={2} className="topic-title">
          {fm(messages.title)}
        </Title>
      </div>
      <div className="left-side">
        <div className="topic-change">
          <div className="new-topic-controls">
            <Input onInput={handleNewTopicNameInput} value={newTopicName} />
            <Button onClick={handleAddNewTopic} htmlType="submit" type="primary">
              {fm(messages.createTopicBtn)}
            </Button>
          </div>
          <Table
            className="topic-change-table"
            columns={columns}
            dataSource={topics}
            pagination={{ pageSize: 6, pageSizeOptions: [], showLessItems: true }}
          />
        </div>
      </div>
      <div className="right-side">
        <div className="current-topic">
          {currentTopic ? (
            <>
              <div className="topic-header">
                <Title level={3} className="topic-title">
                  {fm(messages.topicLabel)}
                  {currentTopic.title}
                </Title>
                <Title level={4} className="topic-author">
                  {fm(messages.authorLabel)}
                  {authors.length > 0 &&
                    authors.map((item) => {
                      if (item?.id === currentTopic?.userId) {
                        return <span key={item?.id}>{item?.name} </span>;
                      }

                      return false;
                    })}
                </Title>
                <p className="topic-body">{currentTopic.body}</p>
              </div>
              {posts && <Posts posts={posts} />}

              <div className="new-post-controls">
                <TextArea
                  onInput={handleNewPostNameInput}
                  value={newPostName}
                  className="new-post-body"
                />
                <Button onClick={handleAddNewPost} htmlType="submit" type="primary">
                  {fm(messages.responseBtn)}
                </Button>
              </div>
            </>
          ) : (
            <Title level={4} className="topic-title">
              {' '}
              {fm(messages.changeTopic)}
            </Title>
          )}
        </div>
      </div>
    </div>
  );
};
