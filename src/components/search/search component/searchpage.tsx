import React, { useEffect, useState } from 'react'
import { Timestamp, collection, getDocs, query, where, orderBy, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firestore-config';
import './searchpage.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaShareSquare } from 'react-icons/fa';

    interface ResultsData {
    id: string;
    title: string;
    url: string;
    category: string;
    price: string;
    createdAt: Timestamp;
    }

    const SearchPage = () => {
    const [resultsData, setResultsData] = useState<ResultsData[]>([]);
    const [filteredData, setFilteredData] = useState<ResultsData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [showList, setShowList] = useState(false);
    const [searchPrice, setSearchPrice] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [likedProducts, setLikedProducts] = useState<string[]>([]);
    const [wishlistProducts, setWishlistProducts] = useState<string[]>([]);
    const [allProducts, setAllProducts] = useState<ResultsData[]>([]);
    const isLiked = (productId: string) => wishlistProducts.includes(productId);
 
    const toggleWishlistProduct = async (productId: string) => {
        const product = resultsData.find((p) => p.id === productId);
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
        const product = resultsData.find((p) => p.id === productId);
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
      
    const searchItem = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filteredData = resultsData.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const priceMatch = item.price.toLowerCase().includes(searchPrice.toLowerCase());
            const categoryMatch = item.category.toLowerCase().includes(searchCategory.toLowerCase());
            return titleMatch && priceMatch && categoryMatch;
        });
        setFilteredData(filteredData);
        setSearchClicked(true);
        setShowList(false);
    }
      
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setSearchQuery(value);
        } else if (name === "price") {
            setSearchPrice(value);
        } else if (name === "category") {
            setSearchCategory(value);
        }
        setSearchClicked(false);
    }

    const handleShowIds = () => {
        setShowList(true);
        setSearchClicked(false);
        allProducts.map((product) => product.id);
      };   

    const handleShare = (productId: string) => {
        const product = resultsData.find((p) => p.id === productId);
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
        const categories = ['Shoes', 'Pants', 'T-shirts', 'Shirts', 'Hoodies', 'Jackets', 'Blazers', 'Jeans', 'Shorts', 'Skirts', 
            'Dresses', 'Underwear', 'Socks', 'Sneakers', 'Sandals', 'Boots', 'Hats', 'Gloves', 'Scarves', 'Accessories' 
        ];
        const fetchNewsItems = async () => {
          const imageList = await Promise.all(categories.map(async category => {
            const categoryRef = collection(db, 'Categories', 'Popular', category);
            const querySnapshot = await getDocs(query(categoryRef, orderBy('createdAt', 'desc')));
            return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as ResultsData);
          }));
          const sortedImages = imageList.flat().sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          const filteredImages = sortedImages.filter(image => image.title && image.price && image.category);
          setResultsData(filteredImages);
          setFilteredData(filteredImages);
        };
        fetchNewsItems();
    }, []);

    useEffect(() => {
        const fetchAllProducts = async () => {
          const productsRef = collection(db, 'All Products');
          const snapshot = await getDocs(productsRef);
          const products = snapshot.docs.map((doc) => doc.data() as ResultsData);
          setAllProducts(products);
        };
        fetchAllProducts();
    }, []);

  return (
    <div>
        <div style={{ backgroundColor: "white", border: "none", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{marginBottom: '10px'}} className='hero'>
                <h1 style={{ color: 'black', margin: 0, marginLeft: 30, fontFamily: 'Style Script', fontSize: 60, textAlign: 'center' }}>Search</h1>
            </div>
        </div>

        <div             
            style={{backgroundColor: 'rgb(207, 205, 203)', boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.3)', padding: '20px 50px', width: '15%', margin: 'auto', 
                display: 'flex', flexDirection: 'column', borderRadius: '0.5em'
            }}  
        >
            <form 
                style={{width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', borderRadius: '0.5em'}} 
                onSubmit={(event) => searchItem(event)}
            >
            <input
                type="text"
                placeholder="Title"
                name="title"
                value={searchQuery}
                onChange={handleInputChange}
                style={{border: 'none', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', padding: '2%' }}
            />
            <input
                type="text"
                placeholder="Price"
                name="price"
                value={searchPrice}
                onChange={handleInputChange}
                style={{border: 'none', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', marginTop: '5px', padding: '2%', }}

            />
            <select value={searchCategory} 
                onChange={(e) => setSearchCategory(e.target.value)}
                style={{border: 'none', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', marginTop: '5px', padding: '2%' }}
            >
                <option value="">Select Category</option>
                <option value="Shoes">Shoes</option>
                <option value="Pants">Pants</option>
                <option value="T-shirts">T-shirts</option>
                <option value="Shirts">Shirts</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Jackets">Jackets</option>
                <option value="Blazers">Blazers</option>
                <option value="Jeans">Jeans</option>
                <option value="Shorts">Shorts</option>
                <option value="Skirts">Skirts</option>
                <option value="Dresses">Dresses</option>
                <option value="Underwear">Underwear</option>
                <option value="Socks">Socks</option>
                <option value="Sneakers">Sneakers</option>
                <option value="Sandals">Sandals</option>
                <option value="Boots">Boots</option>
                <option value="Hats">Hats</option>
                <option value="Gloves">Gloves</option>
                <option value="Scarves">Scarves</option>
                <option value="Accessories">Accessories</option>
            </select>
            <input 
                type="submit" 
                value="Search" 
                style={{border: 'none', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', marginTop: '5px', padding: '2%', borderRadius: '5px', 
                    backgroundColor: 'black', color: 'white', fontSize: '14px' 
                }}
                className="buyButton"
                disabled={!searchQuery && !searchPrice && !searchCategory}
            />
            </form>
            <button 
                style={{border: 'none', boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.3)', marginTop: '5px', padding: '2%', borderRadius: '5px', 
                    backgroundColor: 'black', color: 'white', fontSize: '14px' 
                }} 
                onClick={handleShowIds} 
                className="buyButton" 
            >
                Show All Products
            </button>
        </div>

        <section style={{ marginBottom: '50px' }}>
            {searchClicked && (
                <div className='searchResults'>
                    <h1>Search Results:</h1>
                    <div className='resultsGrid'> 
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                            <div style={{ color: 'black', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr', gap: '40px' }}>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <li 
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
                                            key={item.id}
                                        >
                                            <img 
                                                className="div" 
                                                style={{ padding: '7%', marginBottom: '10px' }} 
                                                src={item.url} 
                                                alt={item.title} 
                                            />
                                            <h3>{item.category}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                                                <p>{item.title}</p>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p>{item.price}</p>
                                                    {isLiked(item.id) ? (
                                                        <AiFillHeart 
                                                            style={{ marginLeft: '5px', color: 'red', cursor: 'pointer' }} 
                                                            onClick={() => handleLike(item.id)} 
                                                        />
                                                    ) : (
                                                        <AiOutlineHeart 
                                                            style={{ marginLeft: '5px', cursor: 'pointer' }} 
                                                            onClick={() => handleLike(item.id)} 
                                                        />
                                                    )}
                                                    <FaShareSquare 
                                                        style={{cursor: 'pointer', marginLeft: '5px'}} 
                                                        onClick={() => handleShare(item.id)} 
                                                    />
                                                </div>
                                            </div>  
                                            <button 
                                                className="buyButton" 
                                                style={{width: '10rem', marginTop: '10px'}} 
                                                onClick={() => handleAddToCart(item.id)}
                                            >
                                                ADD TO CART
                                            </button>
                                        </li>
                                    ))
                                    ) : (
                                    <p>No results found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>  
            )}
            {showList && (
                <div className='searchResults'>
                    <h1>All Products:</h1>
                    <div className='resultsGrid'> 
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto'}}>
                            <div style={{ color: 'black', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr', gap: '40px' }}>
                                {allProducts.length > 0 ? (
                                    allProducts.map((item) => (
                                        <li 
                                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
                                            key={item.id}
                                        >
                                            <img 
                                                className="div" 
                                                style={{ padding: '7%', marginBottom: '10px' }} 
                                                src={item.url} 
                                                alt={item.title} 
                                            />
                                            <h3>{item.category}</h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                                                <p>{item.title}</p>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <p>{item.price}</p>
                                                    {isLiked(item.id) ? (
                                                        <AiFillHeart 
                                                            style={{ marginLeft: '5px', color: 'red', cursor: 'pointer' }} 
                                                            onClick={() => handleLike(item.id)} 
                                                        />
                                                    ) : (
                                                        <AiOutlineHeart 
                                                            style={{ marginLeft: '5px', cursor: 'pointer' }} 
                                                            onClick={() => handleLike(item.id)} 
                                                        />
                                                    )}
                                                    <FaShareSquare 
                                                        style={{cursor: 'pointer', marginLeft: '5px'}} 
                                                        onClick={() => handleShare(item.id)} 
                                                    />
                                                </div>
                                            </div>  
                                            <button 
                                                className="buyButton" 
                                                style={{width: '10rem', marginTop: '10px'}} 
                                                onClick={() => handleAddToCart(item.id)}
                                            >
                                                ADD TO CART
                                            </button>
                                        </li>
                                    ))
                                    ) : (
                                    <p>No results found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    </div>
  );
}

export default SearchPage;

