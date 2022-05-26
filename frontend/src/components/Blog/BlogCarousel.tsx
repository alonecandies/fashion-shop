import React from 'react';
import { Container } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogCard from '@src/components/Blog/BlogCard';
import { IBlog } from '@src/features/blog/blog.types';

SwiperCore.use([Navigation, Pagination]);

interface Props {
  title: string;
  blogs: Array<IBlog>;
}

export const BlogCarousel: React.FC<Props> = ({ title, blogs }) => {
  return (
    <>
      {!!blogs && blogs.length > 0 && (
        <div className="blog-carousel">
          <h1>{title}</h1>
          <Container>
            <Swiper
              spaceBetween={15}
              slidesPerView={3}
              navigation
              loop={false}
              breakpoints={{
                576: {
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 2
                },
                992: {
                  slidesPerView: 3
                }
              }}
            >
              {!!blogs &&
                blogs.map((blog) => (
                  <SwiperSlide key={blog.id}>
                    <BlogCard blog={blog}></BlogCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </Container>
        </div>
      )}
    </>
  );
};
