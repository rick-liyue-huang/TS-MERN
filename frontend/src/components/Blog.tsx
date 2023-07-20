import React from 'react';
import { IBlog } from '../models/blogs';
import { Card } from 'react-bootstrap';
import styles from './Blog.module.css';
import { formatDate } from '../utils/formateDate';

interface BlogProps {
  blog: IBlog;
  className?: string;
}

export default function BlogComponent({ blog, className }: BlogProps) {
  const { title, text, createdAt, updatedAt } = blog;

  let formattedTime: string;

  if (updatedAt > createdAt) {
    formattedTime = 'Updated at: ' + formatDate(updatedAt);
  } else {
    formattedTime = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.blogCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.blogText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{formattedTime}</Card.Footer>
    </Card>
  );
}
