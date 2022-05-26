import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';
import {
  ICategoryLevel0,
  ICategoryLevel1,
  ICategoryLevel2
} from '@src/features/product/category/category.types';
import { ROUTES } from '@src/configs';

interface Props {
  categories: ICategoryLevel0[];
}

const CategoryNav: React.FC<Props> = ({ categories }) => {
  return (
    <>
      {categories.map((category: ICategoryLevel0) => (
        <li key={category.name} className="child-item has-child">
          <Link href={`${ROUTES.product}?category_id=${category.id}&level=0`}>
            <a>
              {category.name} {category.category_level_1.length > 0 ? <FaAngleRight /> : <></>}
            </a>
          </Link>
          {category.category_level_1 ? (
            <ul className="child-fly">
              {category.category_level_1.map((category1: ICategoryLevel1) => (
                <li key={category1.name} className="child-item has-child">
                  <Link href={`${ROUTES.product}?category_id=${category1.id}&level=1`}>
                    <a>
                      {category1.name}{' '}
                      {category1.category_level_2.length > 0 ? <FaAngleRight /> : <></>}
                    </a>
                  </Link>
                  {category1.category_level_2 ? (
                    <ul className="child-fly">
                      {category1.category_level_2.map((category2: ICategoryLevel2) => (
                        <li key={category2.name} className="child-item">
                          <Link href={`${ROUTES.product}?category_id=${category2.id}&level=2`}>
                            {category2.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </li>
      ))}
    </>
  );
};

export default CategoryNav;
