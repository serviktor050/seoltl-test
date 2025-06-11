import React from 'react';
import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import { Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import type { INewsItem } from '../../../../shared/config/interfaces.ts';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

interface INewsItemProps {
    item: INewsItem;
    onDelete: (arg: number) => void;
}

const NewsItem: React.FC<INewsItemProps> = ({
  item: {
    id,
    title,
    content,
  },
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className={cx('news-item')}>
      <div className={cx('header')}>{title}</div>
      <div>{content}</div>
      <div className={cx('buttons')}>
        <Button
          variant="solid"
          endDecorator={<Edit />}
          onClick={() => {navigate(`/edit/${id}`);}}
        >
            Редактировать
        </Button>
        <Button
          variant="outlined"
          startDecorator={<DeleteIcon />}
          onClick={() => {onDelete(id);}}
        >
            Удалить
        </Button>
      </div>

    </div>
  );
};

export default NewsItem;