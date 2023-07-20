import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { IBlog } from './models/blogs';

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

  return <div className="App">{JSON.stringify(blogs)}</div>;
}

export default App;
