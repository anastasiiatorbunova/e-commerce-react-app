import { Outlet } from 'react-router-dom';
import CategoriesMenu from '../../components/categories-menu/categories-menu.component.jsx';

const Home = () => {
  return (
    <div>
        <Outlet />
        <CategoriesMenu />
    </div>
  );
}

export default Home;