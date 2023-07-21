import React from 'react';
import { IBlog } from '../models/blogs';
import { Card } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import styles from './Blog.module.css';
import UtilsStyles from '../styles/utils.module.css';
import { formatDate } from '../utils/formateDate';

interface BlogProps {
  blog: IBlog;
  className?: string;
  onClickToDelete: (blog: IBlog) => void;
  onBlogClick: (blog: IBlog) => void;
}

export default function BlogComponent({
  blog,
  className,
  onClickToDelete,
  onBlogClick,
}: BlogProps) {
  const { title, text, createdAt, updatedAt } = blog;

  let formattedTime: string;

  if (updatedAt > createdAt) {
    formattedTime = 'Updated at: ' + formatDate(updatedAt);
  } else {
    formattedTime = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card
      className={`${styles.blogCard} ${className}`}
      onClick={() => onBlogClick(blog)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={UtilsStyles.flexCenter}>
          {title}{' '}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onClickToDelete(blog);
              e.stopPropagation(); // to prevent the onClick event of the parent element from being triggered
            }}
          />
        </Card.Title>
        <Card.Text className={styles.blogText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{formattedTime}</Card.Footer>
    </Card>
  );
}
