import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Page = styled.div`
  padding-top: 100px;
  background: #0a0a0a;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  padding: 120px 5% 80px;
  background: #050505;
`;

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  color: #fff;
  margin-top: 15px;
  span { 
    -webkit-text-stroke: 1px #fff;
    color: transparent;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 5% 120px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.03);
  padding: 60px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const InputGroup = styled.div`
  margin-bottom: 30px;
  label { 
    display: block; 
    font-weight: 700; 
    margin-bottom: 12px; 
    font-size: 0.85rem; 
    color: #fff; 
    text-transform: uppercase; 
    letter-spacing: 1.5px; 
  }
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px 25px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  height: 200px;
  resize: none;
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
  border-radius: 12px;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(204, 255, 0, 0.2);
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const InfoItem = styled.div`
  h4 { 
    color: #fff; 
    font-size: 1.2rem; 
    font-weight: 900; 
    margin-bottom: 15px; 
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  p { 
    color: #a0a0a0; 
    font-size: 1.1rem; 
    line-height: 1.7; 
  }
`;

const ContactPage = () => {
  return (
    <Page>
      <Header>
        <Badge>Get in Touch</Badge>
        <Title>Let's <span>Connect</span></Title>
      </Header>
      <Content>
        <Form>
          <InputGroup>
            <label>Name</label>
            <Input type="text" placeholder="Your Name" />
          </InputGroup>
          <InputGroup>
            <label>Email</label>
            <Input type="email" placeholder="Your Email" />
          </InputGroup>
          <InputGroup>
            <label>Message</label>
            <TextArea placeholder="How can we help you achieve your goals?" />
          </InputGroup>
          <Button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Send Message
          </Button>
        </Form>
        <InfoBox>
          <InfoItem>
            <h4>Elite Headquarters</h4>
            <p>123 Performance Blvd, Suite 101<br />Modern City, MC 78910</p>
          </InfoItem>
          <InfoItem>
            <h4>Direct Lines</h4>
            <p>Support: +1 (800) 555-0123<br />Email: hello@gymfit.com</p>
          </InfoItem>
          <InfoItem>
            <h4>Operating Hours</h4>
            <p>Monday - Friday: 05:00 - 23:00<br />Weekend: 08:00 - 20:00</p>
          </InfoItem>
        </InfoBox>
      </Content>
    </Page>
  );
};

export default ContactPage;
