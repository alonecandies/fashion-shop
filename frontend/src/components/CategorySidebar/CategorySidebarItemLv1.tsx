/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ICategoryLevel1, ICategoryLevel2 } from '@src/features/product/category/category.types';
import dropDownIcon from 'public/assets/drop_down_arrow.svg';
import Image from 'next/image';
import { IGetAllProductParams } from '@src/features/product/product.types';
import { CATEGORY_LEVEL } from '@src/configs/constants';

interface Props {
  categoryLv1: ICategoryLevel1;
  filter: IGetAllProductParams;
  searchByCategory: Function;
}

const CategorySideBarItemLv1: React.FC<Props> = ({ categoryLv1, filter, searchByCategory }) => {
  const [hideCategory, setHideCategory] = useState(true);
  const dropDown = () => {
    setHideCategory((hideCategory) => !hideCategory);
  };
  return (
    <li className="category_level_1 category_item">
      <div className="category_has_child">
        <div className="inner_category" onClick={dropDown}>
          <div>
            <h3 onClick={() => searchByCategory(categoryLv1.id, CATEGORY_LEVEL.LEVEL_1)}>
              {categoryLv1.name}
            </h3>
          </div>
          <div className={hideCategory ? 'dropdown_rotate' : 'icon'}>
            {categoryLv1.category_level_2.length > 0 && (
              <button className="dropdown_btn">
                <Image src={dropDownIcon} alt={categoryLv1.name} width="10px" height="10px" />
              </button>
            )}
          </div>
        </div>
        <ul className={hideCategory ? 'hidden' : 'display'}>
          {!!categoryLv1 &&
            categoryLv1.category_level_2.map((category2: ICategoryLevel2) => (
              <li
                key={category2.id}
                className="category_item"
                onClick={() => searchByCategory(category2.id, CATEGORY_LEVEL.LEVEL_2)}
              >
                {category2.name}
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};
export default CategorySideBarItemLv1;
