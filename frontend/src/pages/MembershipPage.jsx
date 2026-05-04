import React from 'react';
import styled from 'styled-components';
import MembershipSection from '../components/MembershipSection';

const Page = styled.div`
  padding-top: 100px;
`;

const Header = styled.div`
  text-align: center;
  padding: 120px 5%;
  background: #111;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -3px;
  margin-bottom: 25px;
  span { color: ${props => props.theme.colors.secondary}; }
`;

const MembershipPage = () => {
  return (
    <Page>
      <Header>
        <Title>Join The <span>Elite</span></Title>
        <p style={{color: '#aaa', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem'}}>
          Invest in your transformation. Choose a plan that fits your ambition.
        </p>
      </Header>
      <MembershipSection />
    </Page>
  );
};

export default MembershipPage;
