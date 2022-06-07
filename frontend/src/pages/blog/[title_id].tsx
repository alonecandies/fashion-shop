/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Main } from '@src/templates/Main';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Meta } from '@src/layouts/Meta';
import blogApi from '@src/features/blog/blogApi';
import { IBlog, IGetAllBlogParams } from '@src/features/blog/blog.types';
import moment from 'moment';
import BlogRelated from '@src/components/Blog/BlogRelated';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';

const BlogDetail: React.FC = () => {
  const router = useRouter();
  const { title_id } = router.query;
  const [id, setId] = useState(0);
  const [blog, setBlog] = useState<IBlog | null | undefined>(null);
  const [blogs, setBlogs] = useState<Array<IBlog> | null | undefined>([]);
  useEffect(() => {
    if (!!title_id) {
      const newId: string = title_id.toString().split('-').pop() || '';
      setId(parseInt(newId));
    }
  }, [title_id]);

  const getBlogById = async (id: number) => {
    try {
      const response = await blogApi.getBlogById(id);
      setBlog(response.data);
      return response.data;
    } catch (error) {}
  };
  const viewBlog = async (id: number) => {
    try {
      const response = await blogApi.viewBlog(id);
      return response.data;
    } catch (error) {}
  };
  const getBlogRelated = async (filter: IGetAllBlogParams | null) => {
    try {
      const response = await blogApi.getAllBlogs(filter);
      setBlogs(response.data.results);
      return response.data;
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //get data
  useEffect(() => {
    !!id && getBlogById(id) && viewBlog(id);
  }, [id]);
  useEffect(() => {
    !!blog && getBlogRelated({ blog_category_id: blog.blog_category_id });
  }, [blog]);

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.product, title: 'Sản phẩm' },
    { route: '', title: blog?.title || '' }
  ];

  return (
    <Main meta={<Meta title="HPL Shop | Bài viết" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      {!!blog && (
        <>
          <div className="blog-detail">
            <Container className="mt-5">
              <Row>
                <Col md={12} lg={9}>
                  <h2 className="blog-detail__title">{blog.title}</h2>
                  <h4 className="blog-detail__created-at">
                    {moment(blog.created_at).format('DD/MM/YYYY')}
                  </h4>
                  <div
                    className="blog-detail__content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </Col>
                <Col md={12} lg={3}>
                  <BlogRelated blogs={blogs?.slice(0, 4)} />
                </Col>
              </Row>
              <Row></Row>
            </Container>
          </div>
        </>
      )}
    </Main>
  );
};
export default BlogDetail;
