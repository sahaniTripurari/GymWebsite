import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImg from '../assets/hero-bg.png';

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85; /* Increased for better clarity */
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.2) 0%, 
    rgba(0, 0, 0, 0.4) 50%, 
    rgba(0, 0, 0, 0.9) 100%
  );
  z-index: 2;
`;

const Content = styled(motion.div)`
  z-index: 3;
  max-width: 900px;
  text-align: center;
  padding: 0 5%;
  perspective: 1200px;
  margin-top: 50px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 20px;
  }
`;

const Badge = styled(motion.span)`
  background: ${props => props.theme.colors.secondary};
  color: #000;
  padding: 6px 18px;
  border-radius: 4px;
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-bottom: 25px;
  display: inline-block;
  box-shadow: 0 0 20px rgba(204, 255, 0, 0.3);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.7rem;
    letter-spacing: 3px;
    margin-bottom: 15px;
  }
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.$currentfont};
  font-size: clamp(2.5rem, 7vw, 5.5rem); /* Smaller size so it doesn't cover everything */
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
  line-height: 1;
  margin-bottom: 20px;
  text-transform: uppercase;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);

  span {
    display: block;
    color: ${props => props.theme.colors.secondary};
    -webkit-text-stroke: 0px;
    font-size: 0.85em;
    letter-spacing: 2px;
  }
`;

const DynamicText = styled(motion.div)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 700;
  color: #fff;
  margin-bottom: 35px;
  text-transform: uppercase;
  letter-spacing: 10px;
  border-top: 1px solid rgba(255,255,255,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  display: inline-block;
  padding: 10px 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    letter-spacing: 5px;
    margin-bottom: 25px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  color: #e0e0e0;
  max-width: 550px;
  margin: 0 auto 40px;
  font-weight: 500;
  line-height: 1.6;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.8);
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 20px;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 18px 40px;
  font-size: 0.95rem;
  font-weight: 900;
  background: ${props => props.theme.colors.secondary};
  color: #000;
  border-radius: 0px; /* Sharp edges for athletic look */
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: #fff;
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: 18px 40px;
  font-size: 0.95rem;
  font-weight: 900;
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 0px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
`;

const textVariants = {
  hidden: { opacity: 0, scale: 1.2, filter: 'blur(20px)', y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" } 
  }
};

const fonts = [
  "'Oswald', sans-serif",
  "'Inter', sans-serif",
  "'Montserrat', sans-serif",
  "'Bebas Neue', cursive"
];

const HeroSection = () => {
  const [fontIndex, setFontIndex] = useState(0);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
  const contentY = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex(prev => (prev + 1) % fonts.length);
    }, 4000); // Change font every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroContainer>
      <BackgroundVideo autoPlay loop muted playsInline src="/gym_posterVideo.mp4" />
      <Overlay />
      <Content style={{ y: contentY, opacity }}>
        <Badge
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Unleash The Beast
        </Badge>
        
        <Title
          initial="hidden"
          animate="visible"
          variants={textVariants}
          $currentfont={fonts[fontIndex]}
        >
          Awaken Your <span>Inner Power</span>
        </Title>
        
        <DynamicText
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          No Excuses. Only Results.
        </DynamicText>

        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          JOSH. JUNOON. JEET. Apni limits ko push karo aur us insaan ko discover karo jo tum humesha se banna chahte the. The elite community awaits you.
        </Subtitle>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <PrimaryButton
            href="#membership"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Transformation
          </PrimaryButton>
          <SecondaryButton
            href="#programs"
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Programs
          </SecondaryButton>
        </ButtonGroup>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;
