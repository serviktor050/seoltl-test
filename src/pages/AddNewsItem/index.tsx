import React from 'react';
import { useNavigate } from 'react-router';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Textarea, Input, Button } from '@mui/joy';
import Send from '@mui/icons-material/Send';
import type { INewsItem } from '../../shared/config/interfaces.ts';
import { STORAGE_KEY } from '../../shared/config/constants.ts';
import type { INewsItemForm, ISubmitForm } from './config/intrefaces.ts';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const AddNewsItem: React.FC = () => {
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

  const onSubmit: SubmitHandler<ISubmitForm> = (data) => {
    const newItem: INewsItem = {
      id: Date.now(),
      title: data.title,
      content: data.content,
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const existingItems: INewsItem[] = stored ? JSON.parse(stored) : [];
    const updatedItems = [...existingItems, newItem];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));

    reset();
    navigate('/');
  };

  return (
    <div className={cx('add-news-item-container')}>
      <div className={cx('header')}>
          Добавление новости
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
            Добавить
        </Button>
      </form>
    </div>
  );
};

export default AddNewsItem;