import './App.css';
import Calculator from './Components/PppCalculator.tsx';
import Hero from './Components/Hero.tsx';
import Navbar from './Components/Navbar.tsx';
import About from './Components/About.tsx'; 
import { Routes, Route } from 'react-router-dom'; 
import ContactForm from './Components/ContactForm.tsx';
import PrivacyPolicy from './Components/PrivacyPolicy.tsx';
import BlogCard from './Components/BlogCard.tsx';
import PppArticle from './Components/PppArticle.tsx';

function App() {
  return (
    <div className="App rounded-3xl m-5">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/contactForm" element={<ContactForm />} />
        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/blogCard" element={<BlogCard />} />

        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/pppArticle" element={<PppArticle />} />

        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/hero" element={<Hero />} />

        <Route path="/" element={
          <>
            <Hero />
            <Calculator />
          </>
        } />
        <Route path="/blogcard" element={<BlogCard />} />
      </Routes>
    </div>
  );
}

export default App;