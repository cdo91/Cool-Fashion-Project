import React, {useState} from 'react'
import './FrontPage.css'
import News from '../news/News'
import Category from '../popular-category/Category'
import { useNavigate } from 'react-router-dom'

const FrontPage = () => {
  
  const navigate = useNavigate();

  return (
    <div>
        <section>
            <div style={{ backgroundColor: "white", border: "none", height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2%' }}>
                <div className='hero'>
                    <h1 style={{ color: 'black', margin: 0, marginLeft: 30, fontFamily: 'Style Script', fontSize: 80, textAlign:'center'}}>Cool Fashion</h1>
                    <p style={{color:'black', fontFamily: 'Ubuntu' , fontSize: 30, textAlign: 'center'}}>MAKE A STATEMENT OF YOURSELF</p>
                </div>
            </div>
        </section>
        <section>
          <Category></Category>
        </section>
        <section>
          <News></News>
        </section>
    </div>
  )
}

export default FrontPage
