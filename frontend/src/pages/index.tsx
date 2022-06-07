import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Meta } from '@src/layouts/Meta';
import { Main } from '@src/templates/Main';
import { fetchGetAllBanners, selectBanners } from '@src/features/banner/bannerSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { TYPE_PRODUCT, BANNER_TYPE } from '@src/configs/constants';
import { ProductCarousel } from '@src/components/Product/ProductCarousel';
import { BannerCarousel } from '@src/components/Banner/BannerCarousel';
import { SubBannerCard } from '@src/components/Banner/SubBannerCard';
import { IGetAllProductParams, IProduct } from '@src/features/product/product.types';
import productApi from '@src/features/product/productApi';
import { BlogCarousel } from '@src/components/Blog/BlogCarousel';
import { IBlog, IGetAllBlogParams } from '@src/features/blog/blog.types';
import blogApi from '@src/features/blog/blogApi';

export default function Home() {
  const dispatch = useAppDispatch();

  const banners = useAppSelector(selectBanners);
  const mainBanners = banners.filter((banner) => banner.type == BANNER_TYPE.HOME_MAIN.id);
  const subBanners = banners.filter((banner) => banner.type == BANNER_TYPE.HOME_SUB.id);
  const footerBanners = banners.filter((banner) => banner.type == BANNER_TYPE.HOME_FOOTER.id);
  useEffect(() => {
    if (banners && banners.length > 0) return;
    dispatch(fetchGetAllBanners({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hotProducts, setHotProducts] = useState<Array<IProduct>>([]);
  const getHotProducts = async (filter: IGetAllProductParams) => {
    try {
      const res = await productApi.getAllProducts(filter);
      setHotProducts(res.data.results);
      return res.data;
    } catch (error) {}
  };
  useEffect(() => {
    if (hotProducts && hotProducts.length > 0) return;
    getHotProducts({ type: TYPE_PRODUCT.HOT });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [newProducts, setNewProducts] = useState<Array<IProduct>>([]);
  const getNewProducts = async (filter: IGetAllProductParams) => {
    try {
      const res = await productApi.getAllProducts(filter);
      setNewProducts(res.data.results);
      return res.data;
    } catch (error) {}
  };
  useEffect(() => {
    if (newProducts && newProducts.length > 0) return;
    getNewProducts({ type: TYPE_PRODUCT.VIEW });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const [blogs, setBlogs] = useState<Array<IBlog>>([]);
  const getBlogs = async (filter: IGetAllBlogParams | null) => {
    try {
      const res = await blogApi.getAllBlogs(filter);
      setBlogs(res.data.results);
      return res.data;
    } catch (error) {}
  };
  useEffect(() => {
    if (blogs && blogs.length > 0) return;
    getBlogs({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main meta={<Meta title="HPL Shop" description="Shop thời trang" />}>
      <BannerCarousel items={mainBanners} className="main-banner"></BannerCarousel>
      <Container fluid className="sub-banner">
        <Row>
          {subBanners.map((banner) => (
            <SubBannerCard banner={banner} key={banner.id} />
          ))}
        </Row>
      </Container>
      <Container>
        <ProductCarousel title="Sản phẩm nổi bật" products={hotProducts}></ProductCarousel>
        <ProductCarousel title="Sản phẩm mới" products={newProducts}></ProductCarousel>
      </Container>
      <BannerCarousel items={footerBanners} className="footer-banner"></BannerCarousel>
      <BlogCarousel title="Bản tin HPL" blogs={blogs}></BlogCarousel>
    </Main>
  );
}
