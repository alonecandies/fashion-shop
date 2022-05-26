import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { IBlog } from '@src/features/blog/blog.types';
import BlogCard from '@src/components/Blog/BlogCard';

interface Props {
  blogs: Array<IBlog>;
}

const BlogGrid: React.FC<Props> = ({ blogs }) => {
  return (
    <Row>
      <h2 className="blog__title">Danh sách Bài viết</h2>
      {!!blogs &&
        blogs.map((blog) => (
          <Col lg={4} md={6} xs={12} key={blog.id}>
            <BlogCard blog={blog} />
          </Col>
        ))}
    </Row>
  );
};
export default BlogGrid;
