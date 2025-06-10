import React from 'react';
import classNames from 'classnames/bind';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';

import type { INewsItemForm } from './config/intrefaces.ts';
import { Textarea, Input, Button } from '@mui/joy';
import Send from '@mui/icons-material/Send';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface ISubmitForm {
    title: string,
    content: string,
}

const AddNewsItem: React.FC = () => {
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
  } = methods;

  const onSubmit: SubmitHandler<ISubmitForm> = (data) => {
    console.log(data);
  };

  return (
    <div className={cx('add-news-item-container')}>
      <div className={cx('header')}>
          Страница Новостей
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
            render={({ field }) => (
              <Input
                id="title"
                variant="outlined"
                placeholder="Заголовок новости"
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
            render={({ field }) => (
              <Textarea minRows={2}
                id="content"
                placeholder="Текст новости"
                variant="outlined"
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
            Отправить
        </Button>
      </form>
    </div>
  );
};

export default AddNewsItem;