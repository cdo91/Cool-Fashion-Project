import React, {useEffect, useState} from 'react'
import './News.css'
import { db } from '../../firestore-config'
import { collection, getDocs } from '@firebase/firestore'
import { query, orderBy, Timestamp } from 'firebase/firestore';

interface NewsData {
  id: string;
  url: string;
  title: string;
  category: string;
  createdAt: Timestamp;
}

const News = () => {

  const [newsData, setNewsData] = useState<NewsData[]>([]);
  
  useEffect(() => {
    const categories = ['Shoes', 'Pants', 'T-shirts', 'Shirts', 'Hoodies', 'Jackets', 'Blazers', 'Jeans', 'Shorts', 'Skirts', 
      'Dresses', 'Underwear', 'Socks', 'Sneakers', 'Sandals', 'Boots', 'Hats', 'Gloves', 'Scarves', 'Accessories' 
    ];
    const fetchNewsItems = async () => {
      const imageList = await Promise.all(categories.map(async category => {
        const categoryRef = collection(db, 'Categories', 'News', category);
        const querySnapshot = await getDocs(query(categoryRef, orderBy('createdAt', 'desc')));
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as NewsData);
      }));
      const sortedImages = imageList.flat().sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setNewsData(sortedImages.slice(0, 3));
    };
    fetchNewsItems();
  }, []);
    
  return (
    <div>
      <section>
        <h1 style={{textAlign: 'center', marginBottom: 30, fontSize: '24px'}}>News</h1>
        <div 
          style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', justifyContent: 'center', width: '53rem', 
            alignContent: 'center', margin: 'auto', gap: '20px'
          }}

        >
          {newsData.slice(0, 3).map((image) => (
            <div 
              key={image.id} 
              style={{textAlign: 'center'}}
            >
              <div className='div'>
                <div 
                  id='newsPic' 
                  style={{backgroundImage: `url(${image.url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', 
                    backgroundPosition: 'center', height: '200px', backgroundColor: 'rgb(207, 205, 203)'
                  }} 
                />
              </div>
              <div>
                <h3 style={{marginTop: '10px'}}>{image.category}</h3>
                <p>{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default News 