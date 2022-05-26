import React from 'react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

interface Breadcrumb {
  route: string;
  title: string;
}

interface Props {
  breadcrumbs: Array<Breadcrumb>;
}

const Breadcrumb: React.FC<Props> = ({ breadcrumbs }) => {
  return (
    <Container className="breadcrumb">
      {breadcrumbs.slice(0, breadcrumbs.length - 1).map((breadcrumb) => (
        <span key={breadcrumb.title}>
          <Link href={breadcrumb.route}>
            <a className="breadcrumb-title">{breadcrumb.title.toUpperCase()}</a>
          </Link>
          /
        </span>
      ))}
      <span className="breadcrumb-title">
        {breadcrumbs[breadcrumbs.length - 1].title.toUpperCase()}
      </span>
    </Container>
  );
};

export default Breadcrumb;
