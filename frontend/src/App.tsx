import React, { useState, useEffect } from 'react';
import * as BlogApi from './api/api_blogs';
import { FaPlus } from 'react-icons/fa';
import { IBlog } from './models/blogs';
import BlogComponent from './components/Blog';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import styles from './pages/BlogPage.module.css';
import UtilsStyles from './styles/utils.module.css';
import AddOrEditBlogDialog from './components/AddOrEditBlogDialog';

function App() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [showAddBlogDialog, setShowAddBlogDialog] = useState(false);
  const [blogBeEdit, setBlogBeEdit] = useState<IBlog | null>(null);

  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const [showBlogLoadingError, setShowBlogLoadingError] =
    useState<boolean>(false);

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

        setShowBlogLoadingError(false);
        setBlogLoading(true);

        const blogs = await BlogApi.fetchBlogs();
        setBlogs(blogs);
      } catch (error) {
        console.error(error);
        // alert(error);
        setShowBlogLoadingError(true);
      } finally {
        setBlogLoading(false);
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

  const content = (
    <Row xs={1} md={2} xl={3} className={`${styles.blogGrid} g-3`}>
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
  );

  return (
    <Container className={styles.blogPage}>
      <Button
        className={`${UtilsStyles.blogCenter} my-3 ${UtilsStyles.flexCenter}`}
        onClick={() => setShowAddBlogDialog(true)}
      >
        <FaPlus />
        Add Blog
      </Button>
      {
        // if blogLoading is true, then show loading
        blogLoading && <Spinner animation="border" variant="primary" />
      }
      {
        // if showBlogLoadingError is true, then show error
        showBlogLoadingError && <div>Something wrong on fetching blogs...</div>
      }
      {!blogLoading && !showBlogLoadingError && (
        <>
          {
            // if blogs.length is 0, then show no blogs
            blogs.length > 0 ? content : <div>No blogs</div>
          }
        </>
      )}
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
