import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Button, Input, Textarea } from '@mui/joy';
import Send from '@mui/icons-material/Send';
import type { INewsItem } from '../../shared/config/interfaces.ts';
import { STORAGE_KEY } from '../../shared/config/constants.ts';
import type { INewsItemForm, ISubmitForm } from './config/interfaces.ts';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const EditNewsItem: React.FC = () => {
  const [newsItems, setNewsItems] = useState<INewsItem[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm<INewsItemForm>({
    defaultValues:
        {
          title: '',
          content: '',
        },
  });

  const {
    control,
    handleSubmit,
    reset,
  } = methods;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: INewsItem[] = JSON.parse(stored);
        setNewsItems(parsed);

        const existingItem = parsed.find(item => item.id === Number(id));
        if (existingItem) {
          reset(existingItem);
        }
      } catch (e) {
        console.error('Ошибка при парсинге:', e);
      }
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<ISubmitForm> = (data) => {
    const updatedItems = newsItems.map(item =>
      item.id === Number(id) ? { ...item, title: data.title, content: data.content } : item,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    navigate('/');
  };

  return (
    <div className={cx('edit-news-item-container')}>
      <div className={cx('header')}>
          Редактирование новости
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
        <div>
          <Controller
            name="title"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Обязательное поле',
              },
            }}
            render={({ field, fieldState: { error: errorField } }) => (
              <Input
                id="title"
                variant="outlined"
                placeholder="Заголовок новости"
                error={!!errorField}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="content"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Обязательное поле',
              },
            }}
            render={({ field, fieldState: { error: errorField } }) => (
              <Textarea minRows={2}
                id="content"
                placeholder="Текст новости"
                variant="outlined"
                error={!!errorField}
                {...field}
              />
            )}
          />
        </div>
        <Button
          type="submit"
          endDecorator={<Send />}
          color="primary"
        >
            Сохранить
        </Button>
      </form>
    </div>
  );
};

export default EditNewsItem;