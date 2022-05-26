import { Main } from '@src/templates/Main';
import { Meta } from 'src/layouts/Meta';
import { Container, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Main meta={<Meta title="Lasy Shop | Page not found" description="Page not found" />}>
      <Container className="mt-3 mb-3">
        <Row>
          <h1 className="text-center">Page not found</h1>
        </Row>
      </Container>
    </Main>
  );
};

export default NotFound;
