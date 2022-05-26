/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import React from 'react';
import { Container } from 'react-bootstrap';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IBanner } from '@src/features/banner/banner.types';

SwiperCore.use([Navigation, Pagination]);

interface Props {
  items: IBanner[];
  className: string;
}

export const BannerCarousel: React.FC<Props> = ({ items, className }) => {
  return (
    <>
      {!!items && items.length > 0 && (
        <Container fluid className={`bannerCarousel ${className}`}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={items.length > 1}
            pagination={items.length > 1}
            loop={false}
          >
            {!!items &&
              items.map((item) => (
                <SwiperSlide key={item.id}>
                  <img src={item.url} alt={item.title} />
                </SwiperSlide>
              ))}
          </Swiper>
        </Container>
      )}
    </>
  );
};
