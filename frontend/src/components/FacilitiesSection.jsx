import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 8%;
  background: #050505;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 80px 5%;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FacilityCard = styled(motion.div)`
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 350px;
  }


  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9));
    z-index: 1;
    transition: all 0.4s ease;
  }

  &:hover::before {
    background: linear-gradient(to bottom, transparent 10%, rgba(204,255,0,0.9));
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  z-index: 2;
  transition: all 0.4s ease;

  h3 {
    font-size: 1.8rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 10px;
    text-transform: uppercase;
    transition: color 0.4s ease;
  }

  p {
    color: #a0a0a0;
    font-size: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
  }

  ${FacilityCard}:hover & h3 {
    color: #000;
  }

  ${FacilityCard}:hover & p {
    opacity: 1;
    transform: translateY(0);
    color: #222;
    font-weight: 600;
  }
`;

const facilities = [
  {
    title: 'Elite Weight Room',
    desc: 'State-of-the-art free weights and resistance machines.',
    img: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Cardio Zone',
    desc: 'High-tech treadmills, rowers, and ellipticals with screens.',
    img: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Recovery Sauna',
    desc: 'Infrared saunas and steam rooms for fast muscle recovery.',
    img: 'https://images.pexels.com/photos/3767397/pexels-photo-3767397.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    title: 'Functional Turf',
    desc: 'Astro-turf area for sled pushes, tire flips, and agility drills.',
    img: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const FacilitiesSection = () => {
  return (
    <Section>
      <Header>
        <Badge>World-Class Environment</Badge>
        <Title>Premium Facilities</Title>
      </Header>
      <Grid>
        {facilities.map((fac, i) => (
          <FacilityCard 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <img src={fac.img} alt={fac.title} />
            <Content>
              <h3>{fac.title}</h3>
              <p>{fac.desc}</p>
            </Content>
          </FacilityCard>
        ))}
      </Grid>
    </Section>
  );
};

export default FacilitiesSection;
