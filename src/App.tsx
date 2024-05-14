import FrontPage from './components/front-page/FrontPage';
import Header from './components/header/Header';
import Contact from './components/contact-page/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './components/admin/Admin';
import CategoryProducts from './components/popular-category/CategoryProducts';
import Wishlist from './components/wishlist-page/Wishlist';
import SearchPage from './components/search/search component/searchpage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/categoryProducts/:category/:id" Component={CategoryProducts} />
          <Route path= "/search" element={<SearchPage />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
