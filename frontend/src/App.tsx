import React, { useState, useEffect } from 'react';

import './App.css';
import { IBlog } from './models/blogs';
import BlogComponent from './components/Blog';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './pages/BlogPage.module.css';

function App() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/blogs`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const blogs = await res.json();
        setBlogs(blogs);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Container className="App">
      <Row xs={1} md={2} xl={3} className="g-3">
        {blogs.map((blog) => (
          <Col key={blog._id}>
            <BlogComponent blog={blog} className={styles.blog} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
