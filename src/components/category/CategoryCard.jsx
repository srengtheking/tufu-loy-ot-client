import { Link } from "react-router-dom";

function CategoryCard({ category }) {
    return (
        <Link to={`/category/${category.id}`} className="category-card">
            <img src={category.image} alt={category.name} />
            <span className="category-card-name">{category.name}</span>
        </Link>
    );
}

export default CategoryCard;
