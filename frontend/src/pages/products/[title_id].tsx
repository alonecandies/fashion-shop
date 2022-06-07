/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import { Main } from '@src/templates/Main';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchGetProductById, selectCurrentProduct } from '@src/features/product/productSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { useRouter } from 'next/router';
import { Meta } from '@src/layouts/Meta';
import { ProductCarousel } from '@src/components/Product/ProductCarousel';
import { FaHeart } from 'react-icons/fa';
import productApi from '@src/features/product/productApi';
import placeholder_image from 'public/assets/images/placeholder_image.png';
import { CartItem } from '@src/features/order/order.types';
import { addItemToCart } from '@src/features/order/orderSlice';
import { IGetAllProductParams, IProduct } from '@src/features/product/product.types';
import { calculatePrice } from '@src/utils';
import { ROUTES } from '@src/configs';
import Breadcrumb from '@src/components/Breadcrumb';
import { toast } from 'react-toastify';

const ProductDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { title_id } = router.query;
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    if (!!title_id) {
      const newId: string = title_id.toString().split('-').pop() || '';
      setId(parseInt(newId));
    }
  }, [title_id]);

  //global state
  const currentProduct = useAppSelector(selectCurrentProduct);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //get data
  useEffect(() => {
    !!id && dispatch(fetchGetProductById(id)) && viewProduct(id);
  }, [dispatch, id]);

  //main image
  const [image, setImage] = useState({
    src: placeholder_image.src,
    title: 'Sản phẩm không có ảnh'
  });
  const changeImage = (newImage: any) => {
    setImage({ src: newImage.url, title: newImage.title });
  };

  useEffect(() => {
    if (currentProduct !== null && !!currentProduct.images[0]) {
      setImage({ src: currentProduct.images[0].url, title: currentProduct.images[0].title });
      !!currentProduct.tags[0] && getRelatedProducts({ tag: currentProduct.tags[0].id });
    }
  }, [dispatch, currentProduct]);

  //like product
  const likeProduct = async (productId: number) => {
    try {
      const response = await productApi.likeProduct(productId);
      return response.data;
    } catch (error) {}
  };

  //view product
  const viewProduct = async (productId: number) => {
    try {
      const response = await productApi.viewProduct(productId);
      return response.data;
    } catch (error) {}
  };

  //order local
  const [order, setOrder] = useState<CartItem>({
    product_id: id || 0,
    code_product: currentProduct?.code_product || '',
    product_title: currentProduct?.title || '',
    product_web_price: currentProduct?.web_price || 0,
    product_sale: currentProduct?.sale || 0,
    image: currentProduct?.images[0],
    color: '',
    size: '',
    quantity: 1
  });
  useEffect(() => {
    !!currentProduct &&
      setOrder((order) => ({
        ...order,
        product_id: id,
        code_product: currentProduct?.code_product,
        product_title: currentProduct?.title,
        product_web_price: currentProduct?.web_price,
        product_sale: currentProduct?.sale,
        image: currentProduct?.images[0],
        color: currentProduct?.colors[0].color,
        size: currentProduct?.sizes[0].type,
        quantity: 1
      }));
  }, [currentProduct, id]);

  const pickSize = (value: string) => {
    !!order && setOrder({ ...order, size: value });
  };
  const pickColor = (value: string) => {
    !!order && setOrder({ ...order, color: value });
  };
  const addProductToCart = () => {
    dispatch(addItemToCart(order));
    toast('Đã thêm vào 🛒!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  //related
  const [relatedProducts, setRelatedProducts] = useState<Array<IProduct>>([]);
  const getRelatedProducts = async (filter: IGetAllProductParams) => {
    try {
      const response = await productApi.getAllProducts(filter);
      setRelatedProducts(response.data.results);
      return response.data;
    } catch (error) {}
  };

  const breadcrumbs = [
    { route: ROUTES.home, title: 'Trang chủ' },
    { route: ROUTES.product, title: 'Sản phẩm' },
    { route: '', title: currentProduct?.title || '' }
  ];

  return (
    <Main meta={<Meta title="HPL Shop | Sản phẩm" description="Shop thời trang" />}>
      <Breadcrumb breadcrumbs={breadcrumbs}></Breadcrumb>
      {currentProduct !== null && (
        <>
          <div className="singleProduct">
            <Container className="mt-5 detail">
              <Row>
                <Col lg="5" md="6" sm="12">
                  <div className="imageCurrentProduct">
                    {image !== null && <img src={image.src} alt={image.title} />}
                    <div className="list-img">
                      <ul>
                        {!!currentProduct.images &&
                          currentProduct.images.map((image, index) => (
                            <li key={image.id} onClick={() => changeImage(image)}>
                              <img src={image.url} data-src={image.url} alt="" />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <div className="content">
                    <h2>{currentProduct.title}</h2>
                    <div className="cost">
                      {currentProduct.sale ? (
                        <>
                          <span style={{ textDecoration: 'line-through' }}>
                            {currentProduct.web_price.toLocaleString('vi', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                          {calculatePrice(
                            currentProduct.web_price,
                            currentProduct.sale
                          ).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </>
                      ) : (
                        <>
                          {currentProduct.web_price.toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND'
                          })}
                        </>
                      )}
                    </div>
                    <p>
                      Danh mục: {currentProduct.product_category_name} <br />
                      Tình trạng: {currentProduct.out_of_stock === 0 ? 'Còn hàng' : 'Hết hàng'}
                    </p>
                    <div className="border-top" />
                    <div className="size">
                      <h6>Size - Kích thước</h6>
                      <ul className="button">
                        {!!currentProduct.sizes &&
                          currentProduct.sizes.map((size) => (
                            <li key={size.id}>
                              <input type="radio" name="size" value={size.type} id={size.type} />
                              <label htmlFor={size.type}>
                                <div
                                  className="optionSize option"
                                  onClick={() => pickSize(size.type)}
                                >
                                  {size.type}
                                </div>
                              </label>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="color">
                      <h6>Color - Màu sắc</h6>
                      <ul className="button">
                        {!!currentProduct.colors &&
                          currentProduct.colors.map((color) => (
                            <li key={color.id}>
                              <input type="radio" name="color" id={color.color} />
                              <label htmlFor={color.color}>
                                <div
                                  className="optionColor option"
                                  style={{ backgroundColor: color.color }}
                                  onClick={() => pickColor(color.color)}
                                />
                              </label>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="add">
                      <button className="btn" onClick={addProductToCart}>
                        Thêm vào giỏ
                      </button>
                      <div className="icon">
                        <button className="heart" onClick={() => likeProduct(currentProduct.id)}>
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm="12">
                  <div className="description">
                    <h2>Thông tin sản phẩm</h2>
                    <div dangerouslySetInnerHTML={{ __html: currentProduct.description }}></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <ProductCarousel products={relatedProducts} title="Sản phẩm liên quan" />
        </>
      )}
    </Main>
  );
};
export default ProductDetail;
