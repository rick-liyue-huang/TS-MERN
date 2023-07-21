import React, { useState, useEffect } from 'react';
import * as BlogApi from './api/api_blogs';
import { FaPlus } from 'react-icons/fa';
import { IBlog } from './models/blogs';
import BlogComponent from './components/Blog';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './pages/BlogPage.module.css';
import UtilsStyles from './styles/utils.module.css';
import AddOrEditBlogDialog from './components/AddOrEditBlogDialog';

function App() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [showAddBlogDialog, setShowAddBlogDialog] = useState(false);
  const [blogBeEdit, setBlogBeEdit] = useState<IBlog | null>(null);

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

  const deleteBlog = async (blog: IBlog) => {
    try {
      // req the backend to delete the blog
      await BlogApi.deleteBlog(blog._id);
      // update the state
      setBlogs(blogs.filter((b) => b._id !== blog._id));
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <Container>
      <Button
        className={`${UtilsStyles.blogCenter} my-3 ${UtilsStyles.flexCenter}`}
        onClick={() => setShowAddBlogDialog(true)}
      >
        <FaPlus />
        Add Blog
      </Button>
      <Row xs={1} md={2} xl={3} className="g-3">
        {blogs.map((blog) => (
          <Col key={blog._id}>
            <BlogComponent
              blog={blog}
              className={styles.blog}
              onClickToDelete={deleteBlog}
              onBlogClick={(blog) => setBlogBeEdit(blog)}
            />
          </Col>
        ))}
      </Row>

      {showAddBlogDialog && (
        <AddOrEditBlogDialog
          onDismiss={() => setShowAddBlogDialog(false)}
          onBlogSaved={(newBlog) => {
            setBlogs([...blogs, newBlog]);
            setShowAddBlogDialog(false);
          }}
        />
      )}
      {
        // if blogBeEdit is not null, then we are editing a blog
        blogBeEdit && (
          <AddOrEditBlogDialog
            blogBeEdit={blogBeEdit}
            onDismiss={() => setBlogBeEdit(null)}
            onBlogSaved={(updatedBlog) => {
              setBlogs(
                blogs.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
              );
              setBlogBeEdit(null);
            }}
          />
        )
      }
    </Container>
  );
}

export default App;
