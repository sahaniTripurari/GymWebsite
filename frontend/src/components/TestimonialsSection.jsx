import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 8%;
  background: #0a0a0a;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  padding: 50px 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 6rem;
    font-family: serif;
    color: rgba(204, 255, 0, 0.1);
    line-height: 1;
  }
`;

const Quote = styled.p`
  font-size: 1.1rem;
  color: #c0c0c0;
  line-height: 1.8;
  margin-bottom: 30px;
  font-style: italic;
`;

const Client = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.secondary};
`;

const Info = styled.div`
  h4 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 800;
    text-transform: uppercase;
  }
  span {
    color: #777;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const testimonials = [
  {
    quote: "I've trained at many gyms, but the atmosphere here is unmatched. The trainers push you past your limits in the best way possible.",
    name: "Alex Mercer",
    title: "Pro Athlete",
    img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The facility is incredible. I lost 20lbs in 3 months just following the personalized programs they set up for me. Truly life-changing.",
    name: "Sarah Jenkins",
    title: "Marketing Exec",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Not just a gym, but a community. The recovery zone is a game-changer after intense heavy lifting sessions.",
    name: "David Chen",
    title: "Powerlifter",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150"
  }
];

const TestimonialsSection = () => {
  return (
    <Section>
      <Header>
        <Badge>Real Stories</Badge>
        <Title>What They Say</Title>
      </Header>
      <Grid>
        {testimonials.map((t, i) => (
          <Card
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Quote>{t.quote}</Quote>
            <Client>
              <Avatar src={t.img} alt={t.name} />
              <Info>
                <h4>{t.name}</h4>
                <span>{t.title}</span>
              </Info>
            </Client>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
