import React from 'react';
import styled from 'styled-components';
import ProgramsSection from '../components/ProgramsSection';

const Page = styled.div`
  padding-top: 100px;
`;

const Header = styled.div`
  text-align: center;
  padding: 120px 5%;
  background: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  color: #111;
  text-transform: uppercase;
  letter-spacing: -3px;
  line-height: 1;
  margin-bottom: 25px;
  span { color: ${props => props.theme.colors.secondary}; }
`;

const Sub = styled.p`
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.2rem;
`;

const ProgramsPage = () => {
  return (
    <Page>
      <Header>
        <Title>Our <span>Programs</span></Title>
        <Sub>
          World-class training architectures designed by industry experts to unlock your maximum physical potential.
        </Sub>
      </Header>
      <ProgramsSection />
    </Page>
  );
};

export default ProgramsPage;
