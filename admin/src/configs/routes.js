import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/Dashboard/DashboardLayout';
import MainLayout from 'src/layouts/Main/MainLayout';
import Account from 'src/pages/Account/Account';
import UserList from 'src/pages/User/UserList';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import Login from 'src/pages/Authen/Login';
import NotFound from 'src/pages/Error/NotFound';
import {
  ProductList,
  ProductCategory,
  ProductColor,
  ProductTag,
  ProductSize,
  ProductImage
} from 'src/pages/Product';
import Register from 'src/pages/Authen/Register';
import Settings from 'src/pages/Setting/Settings';
import BannerList from 'src/pages/Banner/BannerList';
import BlogList from 'src/pages/Blog/BlogList';
import BlogCategory from 'src/pages/Blog/BlogCategory';
import Cart from 'src/pages/Cart/Cart';
import Contact from 'src/pages/Contact/Contact'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'users', element: <UserList /> },
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'products',
        children: [
          { path: 'list', element: <ProductList /> },
          { path: 'category', element: <ProductCategory /> },
          { path: 'tag', element: <ProductTag /> },
          { path: 'color', element: <ProductColor /> },
          { path: 'size', element: <ProductSize /> },
          { path: 'image', element: <ProductImage /> }
        ]
      },
      { path: 'carts', element: <Cart /> },
      { path: 'banners', element: <BannerList /> },
      {
        path: 'blogs',
        children: [
          { path: 'list', element: <BlogList /> },
          { path: 'category', element: <BlogCategory /> }
        ]
      },
      { path: 'contacts', element: <Contact /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/products/list" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
