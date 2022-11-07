import React from "react";
import { useLoaderData, Link } from "remix";

export const loader = () => {
  const data = {
    posts: [
      {
        id: 1,
        title: "Post 1",
        body: "This is body 1",
      },
      {
        id: 2,
        title: "Post 2",
        body: "This is body 2",
      },
      {
        id: 3,
        title: "Post 3",
        body: "This is body 3",
      },
    ],
  };
  return data;
};

function Posts() {
  const { posts } = useLoaderData();
  console.log(posts, "pos");

  return (
    <div>
      <div className="flexBox">
        <div>
          <h1>Posts</h1>
        </div>
        <div className="btn">
          <Link to="/posts/new">New Post</Link>
        </div>
      </div>
      <div>
        {posts.map(({ id, title, body }) => {
          return (
            <div className="post-card" key={id}>
              <div className="title">{title}</div>
              <div className="body">{body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
