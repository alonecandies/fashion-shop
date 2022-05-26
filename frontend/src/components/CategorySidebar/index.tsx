import React from 'react';
import { ICategoryLevel0 } from '@src/features/product/category/category.types';
import CategorySideBarItemLv0 from '@src/components/CategorySidebar/CategorySidebarItemLv0';
import { IGetAllProductParams } from '@src/features/product/product.types';

interface Props {
  categories: ICategoryLevel0[];
  filter: IGetAllProductParams;
}

const CategorySideBar: React.FC<Props> = ({ categories, filter }) => {
  return (
    <div className="product_filters">
      {!!categories &&
        categories.map((category: ICategoryLevel0) => (
          <CategorySideBarItemLv0 key={category.id} categoryLv0={category} filter={filter} />
        ))}
    </div>
  );
};
export default CategorySideBar;
