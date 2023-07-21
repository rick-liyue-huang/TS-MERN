import React, { useState, useEffect } from 'react';
import * as BlogApi from './api/api_blogs';

import { IBlog } from './models/blogs';
import BlogComponent from './components/Blog';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './pages/BlogPage.module.css';
import AddBlogDialog from './components/AddBlogDialog';
import UtilsStyles from './styles/utils.module.css';

function App() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [showAddBlogDialog, setShowAddBlogDialog] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        /**
        const res = await fetch(`http://localhost:4000/api/blogs`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const blogs = await res.json();
         */

        const blogs = await BlogApi.fetchBlogs();
        setBlogs(blogs);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Container>
      <Button
        className={`${UtilsStyles.blogCenter} my-3`}
        onClick={() => setShowAddBlogDialog(true)}
      >
        Add Blog
      </Button>
      <Row xs={1} md={2} xl={3} className="g-3">
        {blogs.map((blog) => (
          <Col key={blog._id}>
            <BlogComponent blog={blog} className={styles.blog} />
          </Col>
        ))}
      </Row>

      {showAddBlogDialog && (
        <AddBlogDialog
          onDismiss={() => setShowAddBlogDialog(false)}
          onBlogSaved={(newBlog) => {
            setBlogs([...blogs, newBlog]);
            setShowAddBlogDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
