import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IProduct } from '@src/features/product/product.types';
import { FaThLarge, FaTh } from 'react-icons/fa';
import ProductCard from '@src/components/Product/ProductCard';
import CustomSelect from '@src/components/CustomSelect';
import { TYPE_PRODUCT_PRICE } from '@src/configs/constants';
import { IGetAllProductParams, Tag } from '@src/features/product/product.types';
import tagApi from '@src/features/product/tag/tagApi';
import { useRouter } from 'next/router';
import { makeQuery } from '@src/utils/requestServerUtil';

interface Props {
  products: Array<IProduct>;
  total: number;
  filter: IGetAllProductParams;
}

const ProductGrid: React.FC<Props> = ({ products, total, filter }) => {
  const router = useRouter();

  const [gridCol, setGridCol] = useState(3);
  const [tags, setTags] = useState([]);
  const [listTagForSelect, setListTagForSelect] = useState([{ value: 0, label: 'Tất cả' }]);
  const [tagPlaceHolder, setTagPlaceHolder] = useState<string>('Tag');
  const [pricePlaceHolder, setPricePlaceHolder] = useState<string>('Giá');

  const getTags = async (name: string | null) => {
    try {
      const response = await tagApi.getAllTags(name);
      setTags(response.data.results);
      return response.data;
    } catch (error) {}
  };
  useEffect(() => {
    getTags(null);
  }, []);

  useEffect(() => {
    if (tags !== null) {
      const listTag: any = tags.map((item: Tag) => ({ value: item.id, label: item.name }));
      listTag.unshift({ value: 0, label: 'Tất cả' });
      setListTagForSelect(listTag);
    }
  }, [tags]);

  const compare = (value1: any, value2: any) => {
    return value1.toString() === value2.toString();
  };
  useEffect(() => {
    !!filter.money &&
      setPricePlaceHolder(
        TYPE_PRODUCT_PRICE.find((item) => compare(item.value, filter.money))?.label || 'Giá'
      );
    !!filter.tag &&
      !!listTagForSelect &&
      setTagPlaceHolder(
        listTagForSelect.find((item) => compare(item.value, filter.tag))?.label || 'Tag'
      );
  }, [filter.money, filter.tag, listTagForSelect]);
  const changeGrid = (value: number) => {
    setGridCol(value);
  };

  const handleChangeTag = (value: number) => {
    if (value === 0) {
      const newFilter = {
        ...filter,
        tag: null
      };
      router.push(makeQuery(newFilter));
    } else {
      const newFilter = {
        ...filter,
        tag: value
      };
      router.push(makeQuery(newFilter));
    }
  };
  const handleChangePrice = (value: number) => {
    const newFilter = {
      ...filter,
      money: value
    };
    router.push(makeQuery(newFilter));
  };
  return (
    <>
      <div className="header">
        <h2>Sản phẩm ({total})</h2>
        <ul className="selections">
          <li className="has_child_item">
            <CustomSelect
              placeholder={pricePlaceHolder}
              listOptions={TYPE_PRODUCT_PRICE}
              defaultValue={filter.money}
              handleChange={handleChangePrice}
            />
          </li>
          <li className="has_child_item">
            <CustomSelect
              placeholder={tagPlaceHolder}
              listOptions={listTagForSelect}
              defaultValue={filter.tag}
              handleChange={handleChangeTag}
            />
          </li>
          <li className="grid">
            <button className="change_grid" onClick={() => changeGrid(2)}>
              <FaThLarge
                title="2 sản phẩm mỗi hàng"
                size="15px"
                color={gridCol === 2 ? 'black' : 'gray'}
              />
            </button>
          </li>
          <li className="grid">
            <button className="change_grid" onClick={() => changeGrid(3)}>
              <FaTh
                title="3 sản phẩm mỗi hàng"
                size="15px"
                color={gridCol === 3 ? 'black' : 'gray'}
              />
            </button>
          </li>
        </ul>
      </div>
      <div className="show">
        <Row className="grid">
          {!!products &&
            products.map((product) => (
              <Col key={product.id} xs={12} md={6} lg={gridCol === 3 ? 4 : 6}>
                <ProductCard product={product} />
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};
export default ProductGrid;
