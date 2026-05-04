import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import api from '../api';

const Page = styled.div`
  padding: 160px 8% 80px;
  min-height: 100vh;
  background: #0a0a0a;
`;

const Header = styled.div`
  margin-bottom: 60px;
  h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; letter-spacing: -2px; color: #fff; text-transform: uppercase; }
  span { 
    -webkit-text-stroke: 1px #fff;
    color: transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ProfileInfo = styled.div`
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid ${props => props.theme.colors.secondary};
    margin-bottom: 20px;
    object-fit: cover;
  }
  h2 {
    color: #fff;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.8rem;
  }
  p {
    color: #777;
    font-weight: 600;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #fff;
  span { font-weight: 800; color: #a0a0a0; text-transform: uppercase; font-size: 0.9rem; }
  strong { font-weight: 800; }
`;

const MembershipCard = styled.div`
  background: linear-gradient(135deg, rgba(204, 255, 0, 0.1), rgba(0,0,0,0));
  border: 1px solid ${props => props.theme.colors.secondary};
  padding: 30px;
  border-radius: 16px;
  margin-top: 20px;
  h3 { color: ${props => props.theme.colors.secondary}; text-transform: uppercase; font-weight: 900; font-size: 1.5rem; margin-bottom: 10px; }
  p { color: #fff; font-weight: 600; }
`;

const BookedSessions = styled.ul`
  list-style: none;
  margin-top: 20px;
  li {
    background: rgba(255, 255, 255, 0.02);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .session-info {
      h4 { color: #fff; text-transform: uppercase; font-weight: 800; }
      p { color: #777; font-size: 0.9rem; }
    }
    .time {
      color: ${props => props.theme.colors.secondary};
      font-weight: 900;
      font-size: 1.2rem;
    }
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();
  const [bookedSessions, setBookedSessions] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/bookings')
        .then(res => setBookedSessions(res.data))
        .catch(err => console.error("Error fetching bookings", err));
    }
  }, [user]);

  if (!user) {
    return (
      <Page>
        <Header><h1>Please <span>Login</span></h1></Header>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <h1>Athlete <span>Profile</span></h1>
      </Header>
      <Grid>
        <Card
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ProfileInfo>
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </ProfileInfo>
          <div style={{ marginTop: '30px' }}>
            <DetailRow><span>Member Since</span><strong>{new Date(user.joinedAt || Date.now()).getFullYear()}</strong></DetailRow>
            <DetailRow><span>Status</span><strong style={{color: user.activePlan ? '#ccff00' : '#ff4d4d'}}>{user.activePlan ? 'Active' : 'Inactive'}</strong></DetailRow>
          </div>
        </Card>

        <div>
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '30px' }}
          >
            <h2 style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 900, marginBottom: '20px' }}>Active Membership</h2>
            {user.activePlan ? (
              <MembershipCard>
                <h3>{user.activePlan} Plan</h3>
                <p>Status: Active • Auto-renews next month</p>
              </MembershipCard>
            ) : (
              <p style={{ color: '#777' }}>No active membership found. Please purchase a plan.</p>
            )}
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 900, marginBottom: '20px' }}>Upcoming Sessions</h2>
            {bookedSessions.length > 0 ? (
              <BookedSessions>
                {bookedSessions.map((session, i) => (
                  <li key={i}>
                    <div className="session-info">
                      <h4>{session.coachName}</h4>
                      <p>{session.date}</p>
                    </div>
                    <div className="time">{session.time}</div>
                  </li>
                ))}
              </BookedSessions>
            ) : (
              <p style={{ color: '#777' }}>No sessions booked yet. Visit the Coaches page to book a session.</p>
            )}
          </Card>
        </div>
      </Grid>
    </Page>
  );
};

export default ProfilePage;
