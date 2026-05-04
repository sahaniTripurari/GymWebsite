import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Page = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(204, 255, 0, 0.05) 0%, transparent 70%);
  top: -200px;
  right: -200px;
  z-index: 0;
`;

const FormBox = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  padding: 60px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: -2px;
  color: #fff;
  span { 
    -webkit-text-stroke: 1px #fff;
    color: transparent;
  }
`;

const Sub = styled.p`
  color: #a0a0a0;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1rem;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    background: rgba(255, 255, 255, 0.05);
    outline: none;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 22px;
  background: ${props => props.theme.colors.secondary};
  color: #000;
  font-weight: 900;
  text-transform: uppercase;
  border-radius: 12px;
  font-size: 1rem;
  margin-top: 5px;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(204, 255, 0, 0.2);
`;

const Redirect = styled.p`
  margin-top: 35px;
  text-align: center;
  color: #777;
  font-size: 0.95rem;
  font-weight: 600;

  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: 800;
    text-transform: uppercase;
    margin-left: 5px;
  }
`;

const ErrorMsg = styled.p`
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 25px 0;
  color: #555;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  &::before { margin-right: 15px; }
  &::after { margin-left: 15px; }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const SocialBtn = styled(motion.button)`
  flex: 1;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-weight: 800;
  font-size: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} Login integration coming soon!`);
  };

  return (
    <Page>
      <Glow />
      <FormBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title>Elite <span>Portal</span></Title>
        <Sub>Access your personal performance dashboard.</Sub>
        
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder="john@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Log In
          </Button>
        </form>

        <Divider>or connect with</Divider>
        
        <SocialContainer>
          <SocialBtn onClick={() => handleSocialLogin('Google')} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>G</SocialBtn>
          <SocialBtn onClick={() => handleSocialLogin('Facebook')} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>f</SocialBtn>
          <SocialBtn onClick={() => handleSocialLogin('X (Twitter)')} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>𝕏</SocialBtn>
        </SocialContainer>

        <Redirect>
          NEW TO GYMFIT? <Link to="/signup">JOIN NOW</Link>
        </Redirect>
      </FormBox>
    </Page>
  );
};

export default LoginPage;
