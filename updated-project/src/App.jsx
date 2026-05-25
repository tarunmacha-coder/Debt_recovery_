import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import WhyChoose from './components/WhyChoose.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Features from './components/Features.jsx';
import Customers from './components/Customers.jsx';
import Jobs from './components/Jobs.jsx';
import Blog from './components/Blog.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useSmoothNav } from './hooks/useSmoothNav.js';

export default function App() {
  useScrollReveal();
  useSmoothNav();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhyChoose />
        <HowItWorks />
        <Features />
        <Customers />
        <Jobs />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
