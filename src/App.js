import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CategoryArticles from './pages/CategoryArticles';
import Auth from './pages/Auth/Auth';
import AddArticle from './pages/AddArticle/AddArticle';

function App() {

  
  const categories = ["Health", "Food", "Travel", "Technology"];


  return (
    <BrowserRouter>
      <Header categories={categories}/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/categories/:categoryName" element={<CategoryArticles/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/addarticle" element={<AddArticle categories={categories}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
