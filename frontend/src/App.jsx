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

const CTASection = styled.section`
  padding: 150px 5%;
  text-align: center;
  background: linear-gradient(135deg, #ccff00 0%, #a2cc00 100%);
  color: #000;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 5%;
  }
`;

const CTAHeading = styled.h2`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  marginBottom: 20px;
  letter-spacing: -2px;
  text-transform: uppercase;
  line-height: 1;
`;

const CTAText = styled.p`
  opacity: 0.8;
  margin: 0 auto 40px;
  font-size: 1.2rem;
  max-width: 700px;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

const CTAButton = styled.button`
  padding: 22px 60px;
  background: #000;
  color: #fff;
  fontWeight: 800;
  borderRadius: 14px;
  fontSize: 1.1rem;
  textTransform: uppercase;
  boxShadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 18px 40px;
    width: 100%;
    max-width: 300px;
  }
`;

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

    <CTASection>
      <CTAHeading>Start Your Journey Today</CTAHeading>
      <CTAText>
        Join our community of elite athletes and transform your life with personalized coaching and world-class facilities.
      </CTAText>
      <CTAButton>Get Membership</CTAButton>
    </CTASection>
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
