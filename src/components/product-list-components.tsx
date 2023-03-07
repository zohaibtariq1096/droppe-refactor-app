import * as React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";

interface IPostsProps {
  products: any;
  onFav: (title: string) => void;
}

const Posts: React.FC<IPostsProps> = ({ products, onFav }) => {
  const productItems = products.map((product: any, index: number) => (
    <Product key={index} product={product} onFav={onFav} />
  ));
  return <div>{productItems.reverse()}</div>;
};

export const Product: React.FC<{
  product: { title: string; description: string; price: number; isFavorite: boolean; rating: {rate: number; count: number} };
  onFav: (title: string) => void;
}> = ({ product, onFav }) => {
  const { productClass, productTitle, productBody, actionBar, actionBarItem, actionBarItemLabel, active} = styles;
  const { title, rating, price, description, isFavorite } = product;
  return (
    <span className={productClass}>
      <span className={productTitle}>
        {title}
      </span>

      <p><strong>Rating: {rating ? `${rating.rate}/5` : ""}</strong></p>

      <p><b>Price: ${+price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br />
        {description}
      </p>

      <span className={actionBar}>
        <span
          className={`${actionBarItem} ${isFavorite ? active : ""}`}
          role="button"
          onClick={() => {
            onFav(title);
          }}
        >
          <FaStar /> <span className={actionBarItemLabel}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </span>
      </span>
    </span>
  );
};

export default Posts;
