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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  
  h3 { color: #777; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
  p { font-size: 3.5rem; font-weight: 900; color: ${props => props.theme.colors.secondary}; }
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  overflow: hidden;

  th, td {
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    color: #c0c0c0;
  }

  th {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    totalUsers: 0,
    todaysBookings: 0,
    recentUsers: []
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      api.get('/admin/stats')
        .then(res => setStats(res.data))
        .catch(err => console.error("Error fetching admin stats", err));
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return (
      <Page>
        <Header>
          <h1>Access <span>Denied</span></h1>
          <p style={{color: '#ff4d4d', marginTop: '20px', fontSize: '1.2rem', fontWeight: 600}}>
            You do not have permission to view this page.
          </p>
        </Header>
      </Page>
    );
  }

  return (
    <Page>
      <Header>
        <h1>Owner <span>Portal</span></h1>
        <p style={{color: '#777', fontSize: '1.2rem', fontWeight: 500}}>System Overview & Management</p>
      </Header>

      <Grid>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3>Total Revenue</h3>
          <p>${stats.totalRevenue}</p>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Active Members</h3>
          <p>{stats.activeUsers}</p>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>Today's Bookings</h3>
          <p>{stats.todaysBookings}</p>
        </StatCard>
        <StatCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </StatCard>
      </Grid>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <SectionTitle>Recent Memberships</SectionTitle>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan Selected</th>
                <th>Join Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUsers.map((u, i) => (
                <tr key={i}>
                  <td style={{fontWeight: 800, color: '#fff'}}>{u.name}</td>
                  <td>{u.email || 'N/A'}</td>
                  <td style={{color: '#ccff00', fontWeight: 600}}>{u.plan}</td>
                  <td>{u.joined}</td>
                  <td>
                    <span style={{
                      padding: '5px 10px', 
                      background: u.status === 'Active' ? 'rgba(204, 255, 0, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                      color: u.status === 'Active' ? '#ccff00' : '#ff4d4d',
                      borderRadius: '5px',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
              {stats.recentUsers.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: 'center'}}>No recent users found.</td></tr>
              )}
            </tbody>
          </Table>
        </div>
      </motion.div>
    </Page>
  );
};

export default AdminDashboard;
