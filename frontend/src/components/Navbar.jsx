import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 25px 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.scrolled {
    padding: 15px 0;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(15px);
  }
`;

const NavContainer = styled(motion.nav)`
  width: 95%;
  max-width: 1300px;
  height: 70px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 20px;
    height: 60px;
    border-radius: 12px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  text-transform: uppercase;
  span { color: ${props => props.theme.colors.secondary}; }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 600;
  color: #a0a0a0;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:hover { color: #fff; }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const JoinBtn = styled(Link)`
  background: ${props => props.theme.colors.secondary};
  color: #000;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 800;
  transition: all 0.3s ease;
  text-transform: uppercase;
  &:hover { 
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(204, 255, 0, 0.4);
  }
`;

const UserGreet = styled.span`
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(25px);
  padding: 100px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  text-align: center;
  z-index: 1000;
`;

const MobileMenuLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <NavWrapper className={scrolled ? 'scrolled' : ''}>
      <NavContainer
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo to="/" onClick={closeMobileMenu}>GYM<span>FIT</span></Logo>
        
        <DesktopMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/membership">Membership</NavLink>
          <NavLink to="/trainers">Coaches</NavLink>
        </DesktopMenu>

        <NavActions>
          {user ? (
            <>
              <UserGreet>HI, {user.name.split(' ')[0].toUpperCase()}</UserGreet>
              <NavLink to="/profile">Profile</NavLink>
              {user.role === 'admin' && <NavLink to="/admin" style={{color: '#ccff00'}}>Admin</NavLink>}
              <button 
                onClick={() => { logout(); navigate('/'); }}
                style={{ 
                  background: 'none', 
                  color: '#ff4d4d', 
                  fontWeight: 800, 
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Exit
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={{color: '#fff'}}>Sign In</NavLink>
              <JoinBtn to="/signup">Join Now</JoinBtn>
            </>
          )}
        </NavActions>

        <MobileToggle onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileToggle>

        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MobileMenuLink to="/" onClick={closeMobileMenu}>Home</MobileMenuLink>
              <MobileMenuLink to="/programs" onClick={closeMobileMenu}>Programs</MobileMenuLink>
              <MobileMenuLink to="/membership" onClick={closeMobileMenu}>Membership</MobileMenuLink>
              <MobileMenuLink to="/trainers" onClick={closeMobileMenu}>Coaches</MobileMenuLink>
              
              {user ? (
                <>
                  <MobileMenuLink to="/profile" onClick={closeMobileMenu} style={{color: '#ccff00'}}>Profile</MobileMenuLink>
                  {user.role === 'admin' && <MobileMenuLink to="/admin" onClick={closeMobileMenu} style={{color: '#00f'}}>Admin</MobileMenuLink>}
                  <button 
                    onClick={() => { logout(); closeMobileMenu(); navigate('/'); }}
                    style={{ 
                      background: 'none', 
                      color: '#ff4d4d', 
                      fontWeight: 800, 
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Exit
                  </button>
                </>
              ) : (
                <>
                  <MobileMenuLink to="/login" onClick={closeMobileMenu}>Sign In</MobileMenuLink>
                  <JoinBtn to="/signup" onClick={closeMobileMenu} style={{ width: '80%', margin: '10px auto 0' }}>Join Now</JoinBtn>
                </>
              )}
            </MobileMenu>
          )}
        </AnimatePresence>

      </NavContainer>
    </NavWrapper>
  );
};

export default Navbar;
