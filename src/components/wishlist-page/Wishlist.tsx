import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from '@mui/material/Icon';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../../firestore-config';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface WishlistProduct {
  id: string;
  title: string;
  category: string;
  url: string;
  price: number;
}

const Wishlist = () => {

  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);
  const isLiked = (productId: string) => {
    return wishlistProducts.some(product => product.id === productId);
  }  

  const handleLike = async (productId: string) => {
    const wishlistRef = collection(db, 'Wishlist');
    const querySnapshot = await getDocs(wishlistRef);
    const productDoc = querySnapshot.docs.find((doc) => doc.data().id === productId);
    if (productDoc) {
      await deleteDoc(doc(wishlistRef, productDoc.id));
      const updatedProducts = wishlistProducts.filter((product) => product.id !== productId);
      setWishlistProducts(updatedProducts);
    }
  };

  useEffect(() => {
    const getWishlistProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Wishlist'));
      const products = querySnapshot.docs.map((doc) => doc.data() as WishlistProduct);
      setWishlistProducts(products);
    };
    getWishlistProducts();
  }, []);

  return (
    <>
      <section>
        <div style={{ backgroundColor: "white", border: "none", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{marginBottom: '10px'}} className='hero'>
            <h1 style={{ color: 'black', margin: 0, marginLeft: 30, fontFamily: 'Style Script', fontSize: 60, textAlign: 'center' }}>Wishlist</h1>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '80px', listStyle: 'none', padding: 0, margin: 'auto', width: '80%'}}>
          {wishlistProducts.map((product) => (
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
              <h3>{product.category}</h3>
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
                </div>
              </div>  
            </li>
          ))}
        </div>
      </section>
    </>
  )
}

export default Wishlist