import { useState, useEffect } from "react";
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import './ShoppingCart.css';

interface CartData {
  id: string;
  url: string;
  title: string;
  price: string;
  category: string;
  createdAt: Date;
  popular: boolean;
}

const ShoppingCart = () => {
  const [cartProducts, setCartProducts] = useState<CartData[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const handleRemoveFromCart = (id: string) => {
    const updatedCartItems = cartProducts.filter((p) => p.id !== id);
    setCartProducts(updatedCartItems);
    localStorage.setItem("cartProducts", JSON.stringify(updatedCartItems));
    window.alert("Product removed from shopping cart");
  };

  useEffect(() => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    setCartProducts(existingCartItems);
    const totalPrice = existingCartItems.reduce((sum: number, product: CartData) => {
      const price = parseFloat(product.price.replace("$", ""));
      return sum + price;
    }, 0);
    setTotalCost(totalPrice);
  }, []);

  return (
    <div>
      <div 
        style={{ marginBottom: '10px' }} 
        className='hero'
      >
        <h1 style={{ color: 'black', margin: 0, marginLeft: 30, fontFamily: 'Style Script', fontSize: 60, textAlign: 'center' }}>Shopping Cart</h1>
      </div>
      <div className='cart-container'>
        {cartProducts.length === 0 ? (
          <p>Your shopping cart is empty.</p>
        ) : (
          <div>
            {cartProducts.map((product) => (
              <div key={product.id} className='cart-item'>
                <div className='cart-item-details'>
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
                <button
                  className='cart-item-remove'
                  onClick={() => handleRemoveFromCart(product.id)}
                >
                  <MdOutlineRemoveShoppingCart />
                  <span>Remove</span>
                </button>
              </div>
            ))}
            <p>Total cost: ${totalCost.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;