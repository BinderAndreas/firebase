import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header/Header';
import CategoryArticles from './pages/CategoryArticles';
import Auth from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/categories/:categoryName" element={<CategoryArticles/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
