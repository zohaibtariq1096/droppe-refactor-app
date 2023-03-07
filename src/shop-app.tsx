import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import Button from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import styles from "./shopApp.module.css";

type Product = {
  title: string;
  description: string;
  price: string;
  isFavorite: boolean;
};

const ShopApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [numFavorites, setNumFavorites] = useState(0);
  const [prodCount, setProdCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setProdCount(data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const favClick = (title: string) => {
    const idx = products.findIndex((prod) => prod.title === title);
    const updatedProds = [...products];
    const currentFavs = numFavorites;
    let totalFavs: number;

    if (updatedProds[idx].isFavorite) {
      updatedProds[idx].isFavorite = false;
      totalFavs = currentFavs - 1;
    } else {
      updatedProds[idx].isFavorite = true;
      totalFavs = currentFavs + 1;
    }

    setProducts(updatedProds);
    setNumFavorites(totalFavs);
  };

  const onSubmit = async (payload: {
    title: string;
    description: string;
    price: string;
  }) => {
    const updatedProds = [...products];
    updatedProds.push({
      title: payload.title,
      description: payload.description,
      price: payload.price,
      isFavorite: false,
    });

    setProducts(updatedProds);
    setProdCount(updatedProds.length);
    setIsOpen(false);
    setIsShowingMessage(true);
    setMessage("Adding product...");

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: payload.title,
          price: payload.price,
          description: payload.description,
        }),
      });
      await response.json();
    } catch (error) {
      console.error("Error adding product:", error);
    }

    setTimeout(() => {
      setIsShowingMessage(false);
      setMessage("");
    }, 2000);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchProducts();
    document.title = "Droppe refactor app";
  }, []);

  return (
    <>
    <div className={styles.header}>
      <div className={`${styles.headerImageWrapper} container`}>
        <img src={logo} className={styles.headerImage} alt="Logo" />
      </div>
    </div>

    <span className={`${styles.main} container`} style={{ margin: '50px auto', display: 'flex', justifyContent: 'space-evenly' }}>
      <img src={img1} style={{ maxHeight: '15em', display: 'block' }} alt="img1" />
      <img src={img2} style={{ maxHeight: '15em', display: 'block' }} alt="img2" />
    </span>

    <div className={`${styles.main} container`} style={{ paddingTop: 0 }}>
      <div className={styles.buttonWrapper}>
        <span role="button">
          <Button onClick={handleButtonClick}>Send product proposal</Button>
        </span>
        {isShowingMessage && (
          <div className={styles.messageContainer}>
            <i>{message}</i>
          </div>
        )}
      </div>

      <div className={styles.statsContainer}>
        <span>Total products: {prodCount}</span> - <span>Number of favorites: {numFavorites}</span>
      </div>

      {products && products.length ? <ProductList products={products} onFav={favClick} /> : <div></div>}
    </div>

    

    <Modal isOpen={isOpen} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
      <div className={styles.modalContentHelper}>
        <div className={styles.modalClose} onClick={handleCloseModal}>
          <FaTimes />
        </div>

        <Form onSubmit={onSubmit} />
      </div>
    </Modal>
  </>
  )
};


export default ShopApp;
