import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Page = styled.div`
  padding-top: 100px;
  background: #0a0a0a;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  padding: 120px 5% 80px;
  background: #050505;
  margin-bottom: 80px;
`;

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  color: #fff;
  margin-top: 15px;
  span { 
    -webkit-text-stroke: 1px #fff;
    color: transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  padding: 0 8% 120px;
  max-width: 1400px;
  margin: 0 auto;
`;

const TrainerCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover { 
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const ImageBox = styled.div`
  height: 450px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(10, 10, 10, 0.8), transparent);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.8;
    transition: transform 0.6s ease;
  }
  ${TrainerCard}:hover & img { transform: scale(1.05); opacity: 1; }
`;

const Info = styled.div`
  padding: 40px;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 8px;
  color: #fff;
  text-transform: uppercase;
`;

const Role = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 25px;
  letter-spacing: 1.5px;
`;

const Bio = styled.p`
  color: #a0a0a0;
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 400;
  margin-bottom: 30px;
  flex-grow: 1;
`;

const BookingSection = styled.div`
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 25px;
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  outline: none;
  font-family: inherit;
  &:focus { border-color: ${props => props.theme.colors.secondary}; }
`;

const BookBtn = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: ${props => props.theme.colors.secondary};
  color: #000;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 10px;
  letter-spacing: 1px;
`;

const TrainersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trainers')
      .then(res => setTrainers(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectChange = (trainerId, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [trainerId]: {
        ...prev[trainerId],
        [field]: value
      }
    }));
  };

  const handleBook = async (trainer) => {
    if (!user) {
      alert("Please login to book a session.");
      navigate('/login');
      return;
    }

    const data = bookingData[trainer.id] || {};
    if (!data.day || !data.time) {
      alert("Please select a day and time.");
      return;
    }

    try {
      await api.post('/bookings', {
        coachName: trainer.name,
        date: data.day,
        time: data.time
      });
      
      alert(`Session booked with ${trainer.name} on ${data.day} at ${data.time}!`);
      navigate('/profile');
    } catch (err) {
      console.error('Error booking session:', err);
      alert('Could not book session. Please try again.');
    }
  };

  return (
    <Page>
      <Header>
        <Badge>The Performance Team</Badge>
        <Title>The <span>Architects</span></Title>
      </Header>
      <Grid>
        {trainers.map((t, i) => (
          <TrainerCard 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <ImageBox><img src={t.img} alt={t.name} /></ImageBox>
            <Info>
              <Name>{t.name}</Name>
              <Role>{t.role}</Role>
              <Bio>{t.bio}</Bio>
              <BookingSection>
                <SelectGroup>
                  <Select onChange={(e) => handleSelectChange(t.id, 'day', e.target.value)} defaultValue="">
                    <option value="" disabled>Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Friday">Friday</option>
                  </Select>
                  <Select onChange={(e) => handleSelectChange(t.id, 'time', e.target.value)} defaultValue="">
                    <option value="" disabled>Select Time</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </Select>
                </SelectGroup>
                <BookBtn 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBook(t)}
                >
                  Book Session
                </BookBtn>
              </BookingSection>
            </Info>
          </TrainerCard>
        ))}
      </Grid>
    </Page>
  );
};

export default TrainersPage;
