import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { Main } from '@src/templates/Main';
import { Meta } from '@src/layouts/Meta';
import { Container, Row, Col } from 'react-bootstrap';
import {
  fetchGetAllProducts,
  selectProducts,
  selectTotalProducts
} from '@src/features/product/productSlice';
import {
  // fetchGetAllCategories,
  selectCategories
} from '@src/features/product/category/categorySlice';
import { IGetAllProductParams } from '@src/features/product/product.types';
import ProductGrid from '@src/components/Product/ProductGrid';
import CategorySideBar from '@src/components/CategorySidebar';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { TYPE_PRODUCT } from '@src/configs/constants';
import { ROUTES } from '@src/configs';
import { useRouter } from 'next/router';
import Pagination from '@src/components/Pagination';
import Breadcrumb from '@src/components/Breadcrumb';

const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  //global state
  const products = useAppSelector(selectProducts);
  const totalProducts = useAppSelector(selectTotalProducts);
  const categories = useAppSelector(selectCategories);

  const rootFilter = {
    category_id: null,
    level: null,
    name: '',
    code: '',
    order: null,
    status: null,
    type: TYPE_PRODUCT.DEFAULT,
    money: null,
    tag: null,
    page: 0,
    pageSize: 12
  };

  const [filter, setFilter] = useState<IGetAllProductParams>({
    ...rootFilter,
    ...router.query
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).length !== 0) {
      const newFilter = { ...router.query };
      setFilter(newFilter);
      dispatch(fetchGetAllProducts(newFilter));
    } else {
      dispatch(fetchGetAllProducts(rootFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.query]);

  const pageCount = Math.ceil(totalProducts / (filter.pageSize || 6));

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.product, title: 'Sản phẩm' }
  ];

  return (
    <Main meta={<Meta title="HPL Shop | Sản phẩm" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      <Container className="mt-5">
        <Row>
          <Col lg={3} md={4} xs={12} className="filter">
            <CategorySideBar categories={categories} filter={filter} />
          </Col>
          <Col lg={9} md={8} xs={12} className="product">
            <ProductGrid products={products} total={totalProducts} filter={filter} />
            {pageCount > 1 && (
              <Pagination pagesCount={pageCount} page={filter.page || 0} filter={filter} />
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
};
export default Product;
