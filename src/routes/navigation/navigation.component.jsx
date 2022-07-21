import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';

import { signOutUser } from '../../utils/firebase/firebase.utils.js';
import { 
    NavigationContainer,
    LogoContainer,
    NavLinksContainer,
    NavLink 
} from '../navigation/navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to='/shop'>
                    Shop
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}> 
                            Sign Out
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            Sign In
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinksContainer>
            { isCartOpen && <CartDropdown /> }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
};

export default Navigation;