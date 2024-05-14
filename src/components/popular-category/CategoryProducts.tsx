import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../firestore-config';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaShareSquare } from 'react-icons/fa';
import './Category.css'
import { FacebookShareButton, FacebookIcon } from "react-share";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

interface ProductData {
  id: string;
  url: string;
  title: string;
  price: string;
  category: string;
  createdAt: Date;
  popular: boolean;
}

const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>();
  const [productData, setProductData] = useState<ProductData[]>([]);
  const nonPopularProducts = productData.filter(product => !product.popular);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<string[]>([]);
  const isLiked = (productId: string) => wishlistProducts.includes(productId);
  const isWishlist = (productId: string) => wishlistProducts.indexOf(productId) !== -1;

  const handleShare = (productId: string) => {
    const product = productData.find((p) => p.id === productId);
    if (!product) return;
    const instagramShareUrl = `https://www.instagram.com/create/post?url=${product.url}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(product.url)}`;
    const shareWindow = window.open('', '_blank', 'width=400,height=400');
    if (shareWindow) {
      shareWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
              }
              .share-option {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 20px;
                padding: 10px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
              }
              .share-option:hover {
                background-color: #f1f1f1;
              }
              .share-option img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
              }
            </style>
          </head>
          <body>
            <div class="share-option" onclick="window.location='${instagramShareUrl}'">
              <img src="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png" alt="Instagram Icon">
              <span>Share on Instagram</span>
            </div>
            <div class="share-option" onclick="window.location='${facebookShareUrl}'">
              <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="Facebook Icon">
              <span>Share on Facebook</span>
            </div>
          </body>
        </html>
      `);
    }
  };
      
  const toggleWishlistProduct = async (productId: string) => {
    const product = productData.find((p) => p.id === productId);
    if (!product) return;
    const wishlistRef = collection(db, "Wishlist");
    const docRef = doc(wishlistRef, productId);
    try {
      if (wishlistProducts.includes(productId)) {
        await deleteDoc(docRef);
        setWishlistProducts(wishlistProducts.filter((id) => id !== productId));
      } else {
        await setDoc(docRef, product);
        setWishlistProducts([...wishlistProducts, productId]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = productData.find((p) => p.id === productId);
    if (!product) return;
    const existingCartItems = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    const updatedCartItems = [...existingCartItems, product];
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartItems));
    alert("Product added to cart");
    window.location.reload();
  };
      
  const handleLike = (productId: string) => {
    const likedProductsCopy = [...likedProducts];
    const productIndex = likedProductsCopy.indexOf(productId);
    if (productIndex === -1) {
      likedProductsCopy.push(productId);
      toggleWishlistProduct(productId);
    } else {
      likedProductsCopy.splice(productIndex, 1);
      toggleWishlistProduct(productId);
    }
    setLikedProducts(likedProductsCopy);
    localStorage.setItem('likedProducts', JSON.stringify(likedProductsCopy));
  };
    
  useEffect(() => {
    const likedProductsJson = localStorage.getItem('likedProducts');
    if (likedProductsJson) {
      const likedProducts = JSON.parse(likedProductsJson);
      setLikedProducts(likedProducts);
    }
  }, []);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const wishlistRef = collection(db, "Wishlist");
      const querySnapshot = await getDocs(wishlistRef);
      const data = querySnapshot.docs.map((doc) => doc.id);
      setWishlistProducts(data);
    };
    fetchWishlistProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const ref = collection(db, 'Categories', 'Popular', category);
        const querySnapshot = await getDocs(query(ref, where('category', '==', category)));
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as ProductData[];
        setProductData(data);
      }
    };
    fetchProducts();
  }, [category]);
      
  return (
    <div>
      
      <div 
        style={{marginBottom: '10px'}} 
        className='hero'
      >
        <h1 style={{ color: 'black', margin: 0, marginLeft: 30, fontFamily: 'Style Script', fontSize: 60, textAlign: 'center' }}>{category} Category</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '80px', listStyle: 'none', padding: 0, margin: 'auto', width: '80%' }}>
        {nonPopularProducts.map((product) => (
          <li 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
            key={product.id}
          >
            <img 
              className="div" 
              style={{ padding: '7%', marginBottom: '10px' }} 
              src={product.url} 
              alt={product.title} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
              <p>{product.title}</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>{product.price}</p>
                {isLiked(product.id) ? (
                  <AiFillHeart 
                    style={{ marginLeft: '5px', color: 'red', cursor: 'pointer' }} 
                    onClick={() => handleLike(product.id)} 
                  />
                ) : (
                  <AiOutlineHeart 
                    style={{ marginLeft: '5px', cursor: 'pointer' }} 
                    onClick={() => handleLike(product.id)} 
                  />
                )}
                <FaShareSquare 
                  style={{cursor: 'pointer', marginLeft: '5px'}} 
                  onClick={() => handleShare(product.id)} 
                />
              </div>
            </div>
            <button 
              className="buyButton" 
              style={{width: '10rem', marginTop: '10px'}} 
              onClick={() => handleAddToCart(product.id)}
            >
              ADD TO CART
            </button>
          </li>
        ))}
      </div>
    </div> 
  )
}

export default CategoryProducts;