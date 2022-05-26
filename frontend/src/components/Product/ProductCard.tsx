/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { IProduct } from '@src/features/product/product.types';
import placeholder_image from 'public/assets/images/placeholder_image.png';
import { slugify, formatCurrency, calculatePrice } from '@src/utils';
import { useEffect } from 'react';
import { ROUTES } from '@src/configs';
import { FaHeart, FaFacebookMessenger } from 'react-icons/fa';
import productApi from '@src/features/product/productApi';
import { FACEBOOK_LINK } from '@src/configs/constants/contact';

interface Props {
  product: IProduct;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  //like product
  const [liked, setLiked] = useState(false);
  const likeProduct = (productId: number) => {
    setLiked(true);
    productApi.likeProduct(productId);
  };
  const [slug, setSlug] = useState(product.id.toString());
  useEffect(() => {
    if (product.title === '') {
    } else if (product.title.length > 200) {
      const newTitle = product.title.slice(200);
      setSlug(slugify(newTitle) + product.id);
    } else {
      setSlug(slugify(product.title) + '-' + product.id);
    }
  }, [product]);

  return (
    <>
      {!!product && (
        <>
          <div className="card_prj">
            <div className="image">
              <Link href={`${ROUTES.product}/${slug}`}>
                <a>
                  {!!product.sale && product.sale !== 0 && (
                    <div className="tag-sale">
                      <span>-{product.sale}%</span>
                    </div>
                  )}
                  {!!product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      data-src={product.images[0].url}
                      alt={product.images[0].title}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={placeholder_image.src}
                      data-src={placeholder_image.src}
                      alt={'Sản phẩm này chưa có ảnh!'}
                      loading="lazy"
                    />
                  )}
                </a>
              </Link>
              <div className="icons">
                <a
                  className="icon"
                  style={{
                    backgroundColor: liked ? 'transparent' : '#85177b',
                    color: liked ? '#85177b' : 'white'
                  }}
                >
                  <FaHeart
                    size="20px"
                    title="Like"
                    onClick={() => {
                      !liked && likeProduct(product.id);
                    }}
                  />
                </a>
                <Link href={FACEBOOK_LINK}>
                  <a className="icon">
                    <FaFacebookMessenger size="20px" title="Fan page" />
                  </a>
                </Link>
              </div>
            </div>

            <Link href={`${ROUTES.product}/${slug}`}>
              <a>
                <div className="content">
                  <a>
                    <h2>{product.title}</h2>
                  </a>
                  <div className="cost">
                    {!!product.sale && product.sale !== 0 ? (
                      <>
                        <div className="cost-sale">
                          {formatCurrency(calculatePrice(product.web_price, product.sale))}
                        </div>
                        <div className="cost-root">{formatCurrency(product.web_price)}</div>
                      </>
                    ) : (
                      <div className="cost-sale">{formatCurrency(product.web_price)}</div>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </>
      )}
    </>
  );
};
export default ProductCard;
