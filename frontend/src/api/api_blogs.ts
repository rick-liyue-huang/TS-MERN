import { IBlog } from '../models/blogs';

export interface IBlogInput {
  title: string;
  text?: string;
}

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMsg = errorBody.error; // match with app.ts on backend
    throw Error(errorMsg);
  }
}

export async function fetchBlogs(): Promise<IBlog[]> {
  const res = await fetchData(`http://localhost:4000/api/blogs`, {
    method: 'GET',
  });

  return res.json();
}

export async function createBlog(blog: IBlogInput): Promise<IBlog> {
  const response = await fetchData('http://localhost:4000/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  });

  return response.json();
}
