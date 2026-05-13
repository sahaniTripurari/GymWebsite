import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import api from '../api';

const Section = styled.section`
  padding: 120px 8%;
  background: #0a0a0a;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 5%;
  }
`;

const Header = styled.div`
  margin-bottom: 80px;
  max-width: 800px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: 40px;
    text-align: center;
    margin: 0 auto 40px;
  }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled(motion.div)`
  height: 450px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  background: #111;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 400px;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(10,10,10,0.9), transparent 70%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  color: #fff;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #a0a0a0;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const MetaInfo = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProgramsSection = () => {
  const [progs, setProgs] = useState([]);

  useEffect(() => {
    api.get('/programs')
      .then(res => setProgs(res.data))
      .catch(err => console.error(err));
  }, []);

  const defaultImg = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800';

  return (
    <Section>
      <Header>
        <Badge>Training Programs</Badge>
        <Title>Built for Results</Title>
      </Header>
      <Grid>
        {progs.map((p, i) => (
          <Card 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <CardImage src={defaultImg} alt={p.title} />
            <Overlay>
              <CardTitle>{p.title}</CardTitle>
              <CardDesc>{p.description}</CardDesc>
              <MetaInfo>{p.durationWeeks} Weeks • {p.difficulty}</MetaInfo>
            </Overlay>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default ProgramsSection;
