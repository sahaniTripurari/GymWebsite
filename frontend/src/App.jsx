import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProgramsSection from './components/ProgramsSection';
import MembershipSection from './components/MembershipSection';
import TransformationSection from './components/TransformationSection';
import FacilitiesSection from './components/FacilitiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ClassScheduleSection from './components/ClassScheduleSection';

// Pages
import ProgramsPage from './pages/ProgramsPage';
import MembershipPage from './pages/MembershipPage';
import TrainersPage from './pages/TrainersPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Cinzel:wght@700;900&family=Oswald:wght@500;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.main};
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: ${props => props.theme.colors.secondary}; }
  
  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; border: none; outline: none; font-family: inherit; }

  section {
    position: relative;
    z-index: 1;
  }
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Home = () => (
  <>
    <HeroSection />
    
    <div id="programs">
      <ProgramsSection />
    </div>

    <div id="schedule">
      <ClassScheduleSection />
    </div>

    <div id="facilities">
      <FacilitiesSection />
    </div>

    <div id="transformations">
      <TransformationSection />
    </div>

    <div id="testimonials">
      <TestimonialsSection />
    </div>

    <div id="membership">
      <MembershipSection />
    </div>

    {/* Modern CTA with Color Accent */}
    <section style={{ 
      padding: '150px 5%', 
      textAlign: 'center', 
      background: 'linear-gradient(135deg, #ccff00 0%, #a2cc00 100%)',
      color: '#000'
    }}>
      <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px', textTransform: 'uppercase' }}>
        Start Your Journey Today
      </h2>
      <p style={{ opacity: 0.8, marginBottom: '40px', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', fontWeight: 600 }}>
        Join our community of elite athletes and transform your life with personalized coaching and world-class facilities.
      </p>
      <button style={{ 
        padding: '22px 60px', background: '#000', color: '#fff', 
        fontWeight: 800, borderRadius: '14px', fontSize: '1.1rem', 
        textTransform: 'uppercase', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        Get Membership
      </button>
    </section>
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/trainers" element={<TrainersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
