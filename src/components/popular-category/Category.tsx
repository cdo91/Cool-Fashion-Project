import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';
import './Category.css';
import { useEffect, useState } from "react";
import { db } from '../../firestore-config';
import { Link } from 'react-router-dom';

interface PopularData {
    id: string;
    url: string;
    title: string;
    category: string;
    popular: boolean;
    createdAt: Timestamp;
}

const Category = () => {

    const [popularData, setPopularData] = useState<PopularData[]>([]);

    useEffect(() => {
        const categories = ['Shoes', 'Pants', 'T-shirts', 'Shirts', 'Hoodies', 'Jackets', 'Blazers', 'Jeans', 'Shorts', 'Skirts', 
            'Dresses', 'Underwear', 'Socks', 'Sneakers', 'Sandals', 'Boots', 'Hats', 'Gloves', 'Scarves', 'Accessories' 
        ];
        const fetchPopularCategories = async () => {
            const images = await Promise.all(
                categories.map(async (category) => {
                    const ref = collection(db, 'Categories', 'Popular', category);
                    const querySnapshot = await getDocs(query(ref, where('popular', '==', true)));
                    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PopularData[];
                })
            );
            setPopularData(images.flat());
        };
        fetchPopularCategories();
    }, []);

    return (
        <>
            <section style={{marginBottom: '50px'}}>
                <h1 style={{ textAlign: 'center', marginBottom: 30, fontSize: '24px' }}>Popular Category</h1>
                <div 
                    style={{ display: 'flex', justifyContent: 'center', width: '53rem', overflowX: 'auto', 
                        margin: 'auto', maxWidth: '100vw', whiteSpace: 'nowrap', scrollBehavior: 'smooth' 
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '20px', padding: '10px', maxWidth: '53rem' }}>
                        {popularData.map((image) => (
                            <div key={image.id} style={{ textAlign: 'center' }}>
                                <div 
                                    style={{ width: '12rem' }} 
                                    className='div'
                                >
                                    <Link to={`/categoryProducts/${image.category}/${image.id}`}>
                                        <div 
                                            id='newsPic' 
                                            style={{ backgroundImage: `url(${image.url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', 
                                                backgroundPosition: 'center', height: '150px', backgroundColor: 'rgb(207, 205, 203)' 
                                            }} 
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <h3 style={{marginTop: '10px'}}>{image.category}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category;
