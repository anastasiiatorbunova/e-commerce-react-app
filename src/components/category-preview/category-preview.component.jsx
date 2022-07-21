import { Link } from 'react-router-dom';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles.jsx';

import ProductCard from "../../components/product-card/product-card.component";

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <Title>
                <Link className='title' to={title}>
                    {title.toUpperCase()}
                </Link>
            </Title>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map(product => <ProductCard key={product.id} product={product} />)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}
 
export default CategoryPreview;