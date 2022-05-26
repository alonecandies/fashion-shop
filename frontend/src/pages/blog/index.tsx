import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { Main } from '@src/templates/Main';
import { Meta } from '@src/layouts/Meta';
import { Container, Row } from 'react-bootstrap';

import { IGetAllBlogParams } from '@src/features/blog/blog.types';
import { useRouter } from 'next/router';
import Pagination from '@src/components/Pagination';
import ProductGrid from '@src/components/Blog/BlogGrid';
import blogApi from '@src/features/blog/blogApi';
import Breadcrumb from '@src/components/Breadcrumb';
import { ROUTES } from '@src/configs';

const Blog: React.FC = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState<IGetAllBlogParams>({
    blog_category_id: null,
    title: '',
    order: null,
    status: null,
    type: null,
    page: 0,
    pageSize: 6,
    ...router.query
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getAllBlogs = async (filter: IGetAllBlogParams | null) => {
    try {
      const response = await blogApi.getAllBlogs(filter);
      setBlogs(response.data.results);
      setTotal(response.data.total);
      return response.data;
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      const newFilter = { ...router.query };
      setFilter(newFilter);
      getAllBlogs(newFilter);
    } else {
      getAllBlogs(filter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const pageCount = Math.ceil(total / (filter.pageSize || 6));

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.blog, title: 'Blog' }
  ];

  return (
    <Main meta={<Meta title="Lasy Shop | Bài viết" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5">
        <Row>
          <ProductGrid blogs={blogs} />
          {pageCount > 1 && (
            <Pagination pagesCount={pageCount} page={filter.page || 0} filter={filter} />
          )}
        </Row>
      </Container>
    </Main>
  );
};
export default Blog;
