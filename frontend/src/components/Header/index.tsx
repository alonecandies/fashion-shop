import { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaAngleDown,
  FaAngleRight,
  FaBars,
  FaHome,
  FaPhone,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUserCircle
} from 'react-icons/fa';
import {
  fetchGetAllCategories,
  selectCategories
} from '@src/features/product/category/categorySlice';
import { logout, selectIsAuth, selectUserInfo } from '@src/features/authen/authenSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/redux';
import { useWindowResize } from '@src/hooks/useWindowResize';
import { ROUTES } from '@src/configs';
import { splitName } from '@src/utils';
import logoImg from 'public/assets/images/Header/logo.jpg';
import CategoryNav from './CategoryNav';
import CategoryNavResp from './CategoryNavResp';
import { loadCart } from '@src/features/order/orderSlice';
import { PHONE_NUMBER } from '@src/configs/constants/contact';

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [width] = useWindowResize();

  const isAuth = useAppSelector(selectIsAuth);
  const userInfo = useAppSelector(selectUserInfo);
  const Logout = () => {
    dispatch(logout());
  };

  const userName: string[] = userInfo?.full_name ? splitName(userInfo.full_name) : [];
  const avatarName: string = userName.join(' ');
  const avatarUI: string = `https://ui-avatars.com/api/?name=${userName.join('+')}&length=${
    userName.length > 1 ? '2' : '1'
  }&background=85177b&color=fff&size=30&bold=true&rounded=true&format=svg`;

  const [menuState, setMenuState] = useState(false);
  const showMenu = () => {
    setMenuState(!menuState);
    setDropdownRespState(false);
  };

  const [dropdownRespState, setDropdownRespState] = useState(false);
  const showDropdownResp = () => {
    setDropdownRespState(!dropdownRespState);
  };

  useEffect(() => {
    if (width >= 992) {
      setMenuState(false);
      setDropdownRespState(false);
    }
  }, [width]);

  const categories = useAppSelector(selectCategories);
  useEffect(() => {
    if (categories && categories.length > 0) return;
    dispatch(fetchGetAllCategories({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const totalOrders = useAppSelector((state) => state.order.totalLocalCart);
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    let href = `${ROUTES.product}?name=${searchInput}`;
    router.push(href);
  };

  return (
    <header className="header">
      <div className="inforHeader">
        <Link href={ROUTES.home}>
          <a className="home" style={{ animationDelay: '0.2s' }}>
            <FaHome />
            Hệ thống cửa hàng
          </a>
        </Link>
        <a href={`tel:${PHONE_NUMBER}`} className="phone" style={{ animationDelay: '0.2s' }}>
          <FaPhone />
          CSKH: {PHONE_NUMBER}
        </a>
      </div>
      <Container>
        <Navbar expand="lg" className="menu navibar">
          <Link href={ROUTES.home} passHref>
            <Navbar.Brand className="navibar-brand">
              <Image src={logoImg} alt="HPL shop logo"></Image>
            </Navbar.Brand>
          </Link>
          <Nav as="ul" className="navibar-nav normal">
            <Nav.Item as="li" className="navi-item" style={{ animationDelay: '0.2s' }}>
              <Link href={ROUTES.home} passHref>
                <Nav.Link className={`navi-link ${router.pathname == ROUTES.home ? 'active' : ''}`}>
                  Trang chủ
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item as="li" className="navi-item has-child" style={{ animationDelay: '0.4s' }}>
              <Link href={ROUTES.product} passHref>
                <Nav.Link
                  className={`navi-link ${router.pathname == ROUTES.product ? 'active' : ''}`}
                >
                  Sản phẩm <FaAngleDown />
                </Nav.Link>
              </Link>
              <ul className="child">
                <CategoryNav categories={categories}></CategoryNav>
              </ul>
            </Nav.Item>
            <Nav.Item as="li" className="navi-item" style={{ animationDelay: '1.2s' }}>
              <Link href={ROUTES.product} passHref>
                <Nav.Link>Sale</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item as="li" className="navi-item" style={{ animationDelay: '1.4s' }}>
              <Link href={ROUTES.blog} passHref>
                <Nav.Link className={`navi-link ${router.pathname == ROUTES.blog ? 'active' : ''}`}>
                  Blog
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav as="ul" className="navibar-nav special-menu">
              <Nav.Item
                as="li"
                className="navi-item has-child search"
                style={{ animationDelay: '1.6s' }}
              >
                <Nav.Link className="navi-link">
                  <FaSearch />
                </Nav.Link>
                <div
                  className="input-search child"
                  style={
                    searchInput
                      ? { display: 'block', position: 'absolute', left: '-100%', top: '40px' }
                      : {}
                  }
                >
                  <input
                    type="text"
                    placeholder="Tìm kiếm ... "
                    onChange={handleInputChange}
                    value={searchInput}
                  ></input>
                  <button onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>
              </Nav.Item>
              <Nav.Item
                as="li"
                className="navi-item has-child user"
                style={{ animationDelay: '1.8s' }}
              >
                <Link href={ROUTES.account} passHref>
                  <Nav.Link className="navi-link">
                    {isAuth ? (
                      <>
                        <Image src={avatarUI} alt="User Avatar" width={25} height={25}></Image>
                        <p>{avatarName}</p>
                      </>
                    ) : (
                      <>
                        <FaUserCircle />
                        <p>Tài khoản</p>
                      </>
                    )}
                  </Nav.Link>
                </Link>
                <ul className="child user-child">
                  {!isAuth ? (
                    <>
                      {' '}
                      <li className="child-item">
                        <Link href={ROUTES.login}>Đăng nhập</Link>
                      </li>
                      <li className="child-item">
                        <Link href={ROUTES.login}>Đăng ký</Link>
                      </li>
                    </>
                  ) : (
                    <li className="child-item" onClick={Logout}>
                      <Link href={ROUTES.home}>Đăng xuất</Link>
                    </li>
                  )}
                </ul>
              </Nav.Item>
              <Nav.Item
                as="li"
                className="navi-item has-child cart"
                style={{ animationDelay: '2s' }}
              >
                <Link href={ROUTES.cart} passHref>
                  <Nav.Link className="navi-link">
                    <FaShoppingCart />
                    <span className="number">{totalOrders}</span>
                  </Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          </Nav>
          <div className="icons-res">
            <Nav.Item className="navi-item has-child cart">
              <Link href={ROUTES.cart} passHref>
                <Nav.Link className="navi-link">
                  <FaShoppingCart />
                  <p className="number">{totalOrders}</p>
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item className="navi-item has-child search">
              <Link href="#" passHref>
                <Nav.Link className="navi-link">
                  <FaSearch />
                </Nav.Link>
              </Link>
              <div
                className="input-search child"
                style={
                  searchInput
                    ? { display: 'block', position: 'absolute', right: '0px', top: '70px' }
                    : {}
                }
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm ... "
                  onChange={handleInputChange}
                  value={searchInput}
                ></input>
                <button onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </Nav.Item>
            <button className="btn-menu" onClick={showMenu}>
              <FaBars />
            </button>
          </div>
        </Navbar>
      </Container>
      {/* Responsive */}
      <ul
        className={`menu-responsive sidenav ${
          menuState ? 'menu-responsive--display' : 'menu-responsive--hide'
        }`}
        id="menu-responsive"
      >
        <button className="btn-menu" onClick={showMenu}>
          <FaTimes />
        </button>
        <li className="menu-responsive__item">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.home}>Trang chủ</Link>
            </div>
          </div>
        </li>
        <li className="menu-responsive__item item-has-child">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.product}>Sản phẩm</Link>
            </div>
            <div className="button icon-menu">
              <button>
                <FaAngleRight
                  onClick={showDropdownResp}
                  className={dropdownRespState == true ? 'dropdown-rotate' : ''}
                />
              </button>
            </div>
          </div>
          {menuState ? (
            <CategoryNavResp
              categories={categories}
              className={`item-child ${
                dropdownRespState == true ? 'item__child-display' : 'item__child-hidden'
              } dropdown-container`}
            />
          ) : (
            <></>
          )}
        </li>
        <li className="menu-responsive__item">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.product}>Sale</Link>
            </div>
          </div>
        </li>
        <li className="menu-responsive__item">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.blog}>Blog</Link>
            </div>
          </div>
        </li>
        <li className="menu-responsive__item">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.account}>Tài khoản</Link>
            </div>
          </div>
        </li>
        <li className="menu-responsive__item">
          <div className="inner">
            <div className="content">
              <Link href={ROUTES.cart}>Giỏ hàng</Link>
            </div>
          </div>
        </li>
        {!isAuth ? (
          <>
            <li className="menu-responsive__item">
              <div className="inner">
                <div className="content">
                  <Link href={ROUTES.login}>Đăng nhập</Link>
                </div>
              </div>
            </li>
            <li className="menu-responsive__item">
              <div className="inner">
                <div className="content">
                  <Link href={ROUTES.login}>Đăng ký</Link>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li className="menu-responsive__item">
            <div className="inner">
              <div className="content" onClick={Logout}>
                <Link href={ROUTES.home}>Đăng xuất</Link>
              </div>
            </div>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
