import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
    ProductCardContainer,
    ProductCardFooter,
    ProductName,
    ProductPrice
} from './product-card.styles.jsx';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <ProductCardFooter>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductCardFooter>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCardContainer>
    )
}
export default ProductCard;