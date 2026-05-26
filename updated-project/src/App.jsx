import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import WhyChoose from './components/WhyChoose.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Features from './components/Features.jsx';
import Customers from './components/Customers.jsx';
import Blog from './components/Blog.jsx';
import Jobs from './components/Jobs.jsx';
import Contact from './components/Contact.jsx';
import DemoModal from './components/Demo.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useSmoothNav } from './hooks/useSmoothNav.js';

export default function App() {
  useScrollReveal();
  useSmoothNav();

  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const open = () => setDemoOpen(true);
    window.addEventListener('open-demo-modal', open);
    return () => window.removeEventListener('open-demo-modal', open);
  }, []);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        <Hero />
        <Problem />
        <WhyChoose />
        <HowItWorks />
        <Features />
        <Customers />
        <Blog />
        <Jobs />
        <Contact />
      </main>
      <Footer />

      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}
