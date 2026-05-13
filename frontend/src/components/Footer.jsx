import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  padding: 120px 8% 60px;
  background: #050505;
  border-top: 1px solid #111;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 5% 40px;
  }
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 80px;
  margin-bottom: 100px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 40px;
    margin-bottom: 60px;
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Column = styled.div``;

const Logo = styled(Link)`
  font-size: 1.6rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 25px;
  display: block;
  text-transform: uppercase;
  letter-spacing: -1px;
  span { color: ${props => props.theme.colors.secondary}; }
`;

const Heading = styled.h4`
  font-size: 0.9rem;
  font-weight: 800;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  margin-bottom: 18px;
`;

const FooterLink = styled(Link)`
  color: #777;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover { color: ${props => props.theme.colors.secondary}; transform: translateX(5px); display: inline-block; }
`;

const Bottom = styled.div`
  border-top: 1px solid #111;
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #555;
  font-size: 0.85rem;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 20px;
  }

  span {
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover { color: #fff; }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Top>
        <Column>
          <Logo to="/">GYM<span>FIT</span></Logo>
          <p style={{color: '#777', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '300px', margin: '0 auto'}}>
            A premium space dedicated to the pursuit of physical and mental excellence. Push your limits with us.
          </p>
        </Column>
        <Column>
          <Heading>Explore</Heading>
          <List>
            <Item><FooterLink to="/programs">Programs</FooterLink></Item>
            <Item><FooterLink to="/membership">Membership</FooterLink></Item>
            <Item><FooterLink to="/trainers">Our Coaches</FooterLink></Item>
          </List>
        </Column>
        <Column>
          <Heading>Support</Heading>
          <List>
            <Item><FooterLink to="/contact">Contact</FooterLink></Item>
            <Item><FooterLink to="/faq">FAQs</FooterLink></Item>
            <Item><FooterLink to="/privacy">Privacy Policy</FooterLink></Item>
          </List>
        </Column>
        <Column>
          <Heading>Visit Us</Heading>
          <p style={{color: '#777', fontSize: '0.95rem', marginBottom: '12px', fontWeight: 600}}>123 Elite Plaza, Power District</p>
          <p style={{color: '#777', fontSize: '0.95rem', fontWeight: 600}}>contact@gymfit.com</p>
        </Column>
      </Top>
      <Bottom>
        <p>&copy; 2026 GYMFIT ELITE. ALL RIGHTS RESERVED.</p>
        <SocialLinks>
          <span>INSTAGRAM</span>
          <span>TWITTER</span>
          <span>YOUTUBE</span>
        </SocialLinks>
      </Bottom>
    </FooterContainer>
  );
};

export default Footer;
