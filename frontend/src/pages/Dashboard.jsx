import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 50px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 25px;
  margin-top: 40px;
`;

const Stat = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  h4 { color: #777; font-size: 0.8rem; text-transform: uppercase; font-weight: 800; margin-bottom: 12px; letter-spacing: 1.5px; }
  p { font-size: 2.5rem; font-weight: 900; color: #fff; }
`;

const ScheduleList = styled.ul`
  list-style: none;
  margin-top: 30px;
`;

const ScheduleItem = styled.li`
  padding: 25px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child { border-bottom: none; }
  
  .time { font-size: 0.9rem; color: #777; font-weight: 600; }
  .name { font-size: 1.2rem; font-weight: 800; color: #fff; text-transform: uppercase; margin-bottom: 5px; }
  .coach { font-size: 0.85rem; color: ${props => props.theme.colors.secondary}; font-weight: 700; text-transform: uppercase; }
`;

const ActionBtn = styled(motion.button)`
  width: 100%;
  padding: 22px;
  margin-top: 30px;
  background: ${props => props.theme.colors.secondary};
  color: #000;
  border-radius: 12px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(204, 255, 0, 0.2);
`;

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/bookings')
        .then(res => setBookings(res.data))
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
        <Badge>Performance Dashboard</Badge>
        <h1>HI, <span>{user.name.split(' ')[0].toUpperCase()}</span></h1>
        <p style={{color: '#777', fontSize: '1.2rem', fontWeight: 500}}>Your journey to excellence is in progress.</p>
      </Header>
      <Grid>
        <Card
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{fontSize: '1.8rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase'}}>Current Metrics</h3>
          <StatsGrid>
            <Stat><h4>Weight</h4><p>75.4</p></Stat>
            <Stat><h4>Body Fat</h4><p>14%</p></Stat>
            <Stat><h4>Streak</h4><p>24</p></Stat>
            <Stat><h4>Power</h4><p>92%</p></Stat>
          </StatsGrid>
          <div style={{
            marginTop: '45px', 
            height: '300px', 
            background: 'rgba(255, 255, 255, 0.01)', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#444',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            Performance Analytics Chart
          </div>
        </Card>
        <Card
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{fontSize: '1.8rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase'}}>Your Routine</h3>
          {bookings.length > 0 ? (
            <ScheduleList>
              {bookings.map((b, i) => (
                <ScheduleItem key={i}>
                  <div>
                    <p className="name">Training Session</p>
                    <p className="coach">{b.coachName}</p>
                  </div>
                  <p className="time">{b.date} • {b.time}</p>
                </ScheduleItem>
              ))}
            </ScheduleList>
          ) : (
            <p style={{ color: '#777', marginTop: '20px' }}>No upcoming sessions.</p>
          )}
          
          <ActionBtn
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/trainers')}
          >
            Book Session
          </ActionBtn>
        </Card>
      </Grid>
    </Page>
  );
};

export default Dashboard;
