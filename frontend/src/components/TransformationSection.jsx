import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 8%;
  background: #0a0a0a;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 5%;
  }
`;

const Header = styled.div`
  margin-bottom: 60px;
  text-align: center;
`;

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -2px;
  margin-top: 15px;
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;
  padding: 20px 0 50px;
  &::-webkit-scrollbar { 
    height: 4px;
  }
  &::-webkit-scrollbar-track { background: #111; }
  &::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 20px;
    padding-bottom: 30px;
  }
`;

const Item = styled(motion.div)`
  flex: 0 0 450px;
  height: 550px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: #111;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 0 0 320px;
    height: 450px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex: 0 0 280px;
    height: 400px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: all 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const Label = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TransformationSection = () => {
  const cases = [
    { name: 'John — 6 Months', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Sarah — 4 Months', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800' },
    { name: 'David — 1 Year', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <Section id="transformations">
      <Header>
        <Badge>Hall of Fame</Badge>
        <Title>Real Transformations</Title>
      </Header>
      <Grid>
        {cases.map((c, i) => (
          <Item 
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Image src={c.img} />
            <Label>{c.name}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  );
};

export default TransformationSection;
