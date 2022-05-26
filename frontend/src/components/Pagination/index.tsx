import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { makeQuery } from '@src/utils/requestServerUtil';

interface Props {
  pagesCount: number;
  page: number;
  filter: any;
}

const CustomPagination: React.FC<Props> = ({ pagesCount, page, filter }) => {
  const router = useRouter();

  let items = [];
  for (let index = 1; index <= pagesCount; index++) {
    items.push(
      <Pagination.Item
        key={index}
        active={index - 1 === page}
        onClick={() => {
          router.push(
            {
              pathname: `${router.pathname}`,
              query: {
                ...filter,
                page: index - 1
              }
            },
            `${router.pathname}${makeQuery({ ...filter, page: index - 1 })}`,
            { shallow: true }
          );
        }}
        activeLabel=""
      >
        {index}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
};
export default CustomPagination;
