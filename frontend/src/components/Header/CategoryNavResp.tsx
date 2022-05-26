import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';
import {
  ICategoryLevel0,
  ICategoryLevel1,
  ICategoryLevel2
} from '@src/features/product/category/category.types';
import { useWindowResize } from '@src/hooks/useWindowResize';
import { ROUTES } from '@src/configs';

interface Props {
  categories: ICategoryLevel0[];
  className: string;
}

interface Props1 {
  categoryLv0: ICategoryLevel0;
}

interface Props2 {
  categoryLv1: ICategoryLevel1;
}

const CategorySideBarItemLv1: React.FC<Props2> = ({ categoryLv1 }) => {
  const [width] = useWindowResize();
  const [hideCategory, setHideCategory] = useState(true);
  const dropDown = () => {
    setHideCategory((hideCategory) => !hideCategory);
  };
  useEffect(() => {
    if (width >= 992) {
      setHideCategory(true);
    }
  }, [width]);

  return (
    <li key={categoryLv1.name} className="menu-responsive__item dropdown-container item-has-child">
      <div className="inner">
        <div className="content">
          <Link href={`${ROUTES.product}?category_id=${categoryLv1.id}&level=1`}>
            <a>{categoryLv1.name} </a>
          </Link>
        </div>
        {categoryLv1.category_level_2.length > 0 ? (
          <div className="button icon-menu">
            <button>
              <FaAngleRight
                onClick={dropDown}
                className={hideCategory == false ? 'dropdown-rotate' : ''}
              />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {categoryLv1.category_level_2 ? (
        <ul
          className={`item-child ${
            hideCategory == false ? 'item__child-display' : 'item__child-hidden'
          } dropdown-container`}
        >
          {categoryLv1.category_level_2.map((categoryLv2: ICategoryLevel2) => (
            <li key={categoryLv2.name} className="menu-responsive__item">
              <div className="inner">
                <div className="content">
                  <Link href={`${ROUTES.product}?category_id=${categoryLv2.id}&level=2`}>
                    {categoryLv2.name}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </li>
  );
};

const CategorySideBarItemLv0: React.FC<Props1> = ({ categoryLv0 }) => {
  const [width] = useWindowResize();
  const [hideCategory, setHideCategory] = useState(true);
  const dropDown = () => {
    setHideCategory((hideCategory) => !hideCategory);
  };
  useEffect(() => {
    if (width >= 992) {
      setHideCategory(true);
    }
  }, [width]);

  return (
    <li className="menu-responsive__item dropdown-container item-has-child">
      <div className="inner">
        <div className="content">
          <Link href={`${ROUTES.product}?category_id=${categoryLv0.id}&level=0`}>
            <a>{categoryLv0.name} </a>
          </Link>
        </div>
        {categoryLv0.category_level_1.length > 0 ? (
          <div className="button icon-menu">
            <button>
              <FaAngleRight
                onClick={dropDown}
                className={hideCategory == false ? 'dropdown-rotate' : ''}
              />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {categoryLv0.category_level_1 ? (
        <ul
          className={`item-child ${
            hideCategory == false ? 'item__child-display' : 'item__child-hidden'
          } dropdown-container`}
        >
          {!!categoryLv0 &&
            categoryLv0.category_level_1.map((category: ICategoryLevel1) => (
              <CategorySideBarItemLv1 key={category.id} categoryLv1={category} />
            ))}
        </ul>
      ) : (
        <></>
      )}
    </li>
  );
};

const CategorySideBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <ul className={className}>
      {!!categories &&
        categories.map((category: ICategoryLevel0) => (
          <CategorySideBarItemLv0 key={category.id} categoryLv0={category} />
        ))}
    </ul>
  );
};
export default CategorySideBar;
