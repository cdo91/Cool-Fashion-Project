import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Header.css'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firestore-config';

interface CartData {
    id: string;
    url: string;
    title: string;
    price: string;
    category: string;
    createdAt: Date;
    popular: boolean;
  }

const Header = () => {

    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartData[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchCartProducts = () => {
          const existingCartItems = JSON.parse(localStorage.getItem("cartProducts") || "[]");
          setCartProducts(existingCartItems);
          setCartItemCount(existingCartItems.length);
        };
      
        fetchCartProducts();
    }, []);
      
    useEffect(() => {
      setCartItemCount(cartProducts.length);
    }, [cartProducts]);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    }

    useEffect(() => {
        const fetchCartProducts = () => {
          const existingCartItems = JSON.parse(localStorage.getItem("cartProducts") || "[]");
          setCartProducts(existingCartItems);
          setCartItemCount(existingCartItems.length);
        };
    
        fetchCartProducts();
    }, []);
    
    return (
        <div>
            <header style={{ backgroundColor: 'black', borderBottom: 'solid 1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ padding: '1rem' }}>
                    <nav style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '14px' }}>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 20, }}>
                            <li>
                            <a href="#" onClick={() => navigate("/")} className='navLink'>Home</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => navigate("wishlist")} className='navLink'>Wishlist</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => navigate("contact")} className='navLink'>Contact Us</a>
                            </li>
                            <li>
                            <a href="#" onClick={() => navigate("admin")} className='navLink'>Admin</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <nav style={{ display: 'flex', justifyContent: 'center', fontSize: '14px', marginRight: '165px' }}>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 20 }}>
                            <li style={{ marginRight: '10px' }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="#" className='navLink'>Products</a>
                                <div className="submenu">
                                    <div className="submenuContent">
                                        <div style={{ backgroundColor: 'white', padding: '0.5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' }}>
                                            <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Products</h3>
                                            <div 
                                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', 
                                                    backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' 
                                                }}
                                            >
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 20 }}>
                            <li style={{ marginRight: '10px' }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="#" className='navLink'>Brands</a>
                                <div className="submenuTwo">
                                    <div className="submenuContent">
                                        <div style={{ backgroundColor: 'white', padding: '0.5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' }}>
                                            <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Brands</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', 
                                                    backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' 
                                                }}
                                            >
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 20 }}>
                            <li style={{ marginRight: '10px' }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <a href="#" className='navLink'>Top Sellers</a>
                                <div className="submenuThree">
                                    <div className="submenuContent">
                                        <div style={{ backgroundColor: 'white', padding: '0.5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' }}>
                                            <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Top Sellers</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', 
                                                    backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.5)' 
                                                }}
                                            >
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                                                    <li><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div style={{ padding: '1rem' }}>
                    <nav style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '14px' }}>
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 20 }}>
                            <li>
                                <a href="#" onClick={() => navigate("search")} className='navLink'>Search</a>
                            </li>
                            <li>
                                <Link to="/ShoppingCart">
                                    <AddShoppingCartIcon fontSize='medium' className='myIcon' />
                                    {cartItemCount > 0 && <span style={{color: 'white'}} className="cart-count">({cartItemCount})</span>}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header


{/* <li style={{ marginRight: '10px' }}
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave}
>
<a href="#" className='navLink'>Brands</a>
<div className="submenuTwo">
    <div className="submenuContent">
        <div style={{ backgroundColor: 'white', padding: '0.5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Brands</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)' }}>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</li>
<li style={{ marginRight: '10px' }}
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave}
>
<a href="#" className='navLink'>Top Sellers</a>
<div className="submenuThree">
    <div className="submenuContent">
        <div style={{ backgroundColor: 'white', padding: '0.5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Top Sellers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)' }}>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</li>
<li style={{ marginRight: '10px' }}
onMouseEnter={handleMouseEnter}
onMouseLeave={handleMouseLeave} >
<a href="#" className='navLink'>About Us</a>
<div className="submenuFour">
    <div className="submenuContent">
        <div style={{ backgroundColor: 'white', padding: '0.5% 5% 4% 4%', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)', alignItems: 'center' }}>
            <h3 style={{ textAlign: 'center', marginBottom: 30 }} >About Us</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', justifyItems: 'center', backgroundColor: 'black', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)' }}>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
                <ul style={{ padding: '10% 30%', listStyle: 'none' }}>
                    <li><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                    <li style={{ marginTop: '5px' }}><a className='dropDownLink' href="#">Link</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</li> */}
