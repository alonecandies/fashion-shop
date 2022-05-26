import React from 'react';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductCard from '@src/components/Product/ProductCard';
import { IProduct } from '@src/features/product/product.types';

// Import Swiper styles
// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

interface Props {
  title: string;
  products: Array<IProduct>;
}

export const ProductCarousel: React.FC<Props> = ({ title, products }) => {
  return (
    <>
      {!!products && products.length > 0 && (
        <div className="productsSlider">
          <h1>{title}</h1>
          <div className="container-fluid">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              navigation
              loop={false}
              breakpoints={{
                576: {
                  spaceBetween: 0,
                  slidesPerView: 1
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 5
                },
                960: {
                  slidesPerView: 3,
                  spaceBetween: 5
                },
                1080: {
                  slidesPerView: 4,
                  spaceBetween: 5
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 5
                }
              }}
            >
              {!!products &&
                products.slice(0, 10).map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};
