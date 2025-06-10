import React from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import { Button } from '@mui/joy';
import { Add } from '@mui/icons-material';

import { FEED_LIST } from '../../shared/config/constants.ts';
import { NewsItem } from './ui';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const FeedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('feed-page-container')}>
      <div className={cx('header')}>
        Страница Новостей
      </div>
      <Button
        startDecorator={<Add />}
        onClick={() => {navigate('/add');}}
      >
          Добавить новость
      </Button>
      <div className={cx('list')}>
        {FEED_LIST.map((item) => (
          <NewsItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;