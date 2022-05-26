import React from 'react';
import { ICategoryLevel0, ICategoryLevel1 } from '@src/features/product/category/category.types';
import CategorySideBarItemLv1 from '@src/components/CategorySidebar/CategorySidebarItemLv1';
import { IGetAllProductParams } from '@src/features/product/product.types';
import { useRouter } from 'next/router';
import { makeQuery } from '@src/utils/requestServerUtil';
import { CATEGORY_LEVEL } from '@src/configs/constants';

type Props = {
  categoryLv0: ICategoryLevel0;
  filter: IGetAllProductParams;
};

const CategorySideBarItemLv0: React.FC<Props> = ({ categoryLv0, filter }) => {
  const router = useRouter();
  const searchByCategory = (categoryId: number, level: number) => {
    const newFilter = {
      ...filter,
      category_id: categoryId,
      level
    };
    router.push(makeQuery(newFilter));
  };
  return (
    <>
      <h2 onClick={() => searchByCategory(categoryLv0.id, CATEGORY_LEVEL.LEVEL_0)}>
        {categoryLv0.name}
      </h2>
      <ul>
        {!!categoryLv0 &&
          categoryLv0.category_level_1.map((category: ICategoryLevel1) => (
            <CategorySideBarItemLv1
              key={category.id}
              categoryLv1={category}
              filter={filter}
              searchByCategory={searchByCategory}
            />
          ))}
      </ul>
    </>
  );
};
export default CategorySideBarItemLv0;
