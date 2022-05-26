import React from 'react';
import { IBlog } from '@src/features/blog/blog.types';
import BlogCard from '@src/components/Blog/BlogCard';

interface Props {
  blogs: Array<IBlog> | null | undefined;
}

const BlogRelated: React.FC<Props> = ({ blogs }) => {
  return (
    <div className="blog-related">
      <h2 className="blog-related__title">Bài viết liên quan</h2>
      {!!blogs &&
        blogs.map((blog) => (
          <div key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
    </div>
  );
};
export default BlogRelated;
