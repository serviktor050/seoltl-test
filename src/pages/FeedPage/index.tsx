import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import { Button } from '@mui/joy';
import { Add } from '@mui/icons-material';
import type { INewsItem } from '../../shared/config/interfaces.ts';
import { STORAGE_KEY } from '../../shared/config/constants.ts';
import { NewsItem } from './ui';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const FeedPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<INewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: INewsItem[] = JSON.parse(stored);
        setNewsItems(parsed);
      } catch (e) {
        console.error('Ошибка при парсинге:', e);
      }
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = newsItems.filter(item => item.id !== id);
    setNewsItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

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
        {!newsItems.length ? (
          <div>Нет новостей :(</div>
        ): (
          <>
            {newsItems.map((item) => (
              <NewsItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPage;