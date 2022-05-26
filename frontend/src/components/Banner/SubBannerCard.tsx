/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IBanner } from '@src/features/banner/banner.types';
import { Col } from 'react-bootstrap';
import Link from 'next/link';
import { ROUTES } from '@src/configs';

interface Props {
  banner: IBanner;
}

export const SubBannerCard: React.FC<Props> = ({ banner }) => {
  return (
    <>
      {!!banner && (
        <Col lg={6} sm={12} xs={12} className="sub-banner-card">
          <div className="image">
            <img src={banner.url} alt={banner.title} />
          </div>
          <div className="info">
            <Link href={ROUTES.product}>{banner.title}</Link>
            <Link href={ROUTES.product}>SHOP NOW</Link>
          </div>
        </Col>
      )}
    </>
  );
};
