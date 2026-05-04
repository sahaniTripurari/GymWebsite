import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 120px 8%;
  background: #111;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
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

const DaysContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const DayButton = styled.button`
  padding: 12px 25px;
  background: ${props => props.active ? props.theme.colors.secondary : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: 1px solid ${props => props.active ? props.theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  font-weight: 800;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const ScheduleGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const ClassCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ClassInfo = styled.div`
  h4 {
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  p {
    color: #888;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const ClassTime = styled.div`
  text-align: right;
  span {
    display: block;
    font-size: 1.2rem;
    color: ${props => props.theme.colors.secondary};
    font-weight: 900;
  }
  small {
    color: #666;
    font-weight: 700;
  }
`;

const scheduleData = {
  Monday: [
    { name: 'HIIT Burn', trainer: 'Marcus Steel', time: '07:00 AM', duration: '45 Min' },
    { name: 'Powerlifting', trainer: 'Elena Vance', time: '05:00 PM', duration: '60 Min' },
  ],
  Tuesday: [
    { name: 'CrossFit WOD', trainer: 'Jax Thorne', time: '06:30 AM', duration: '60 Min' },
    { name: 'Yoga Core', trainer: 'Sophia Lin', time: '06:00 PM', duration: '50 Min' },
  ],
  Wednesday: [
    { name: 'Boxing Basics', trainer: 'Tyler Ray', time: '08:00 AM', duration: '45 Min' },
    { name: 'Hypertrophy', trainer: 'Marcus Steel', time: '07:00 PM', duration: '90 Min' },
  ],
  Thursday: [
    { name: 'Agility Turf', trainer: 'Elena Vance', time: '07:00 AM', duration: '45 Min' },
    { name: 'HIIT Burn', trainer: 'Marcus Steel', time: '06:00 PM', duration: '45 Min' },
  ],
  Friday: [
    { name: 'Full Body Kettlebell', trainer: 'Jax Thorne', time: '06:00 AM', duration: '60 Min' },
    { name: 'Recovery Yoga', trainer: 'Sophia Lin', time: '05:30 PM', duration: '60 Min' },
  ]
};

const ClassScheduleSection = () => {
  const [activeDay, setActiveDay] = useState('Monday');

  return (
    <Section>
      <Header>
        <Badge>Plan Your Week</Badge>
        <Title>Class Schedule</Title>
      </Header>
      
      <DaysContainer>
        {Object.keys(scheduleData).map(day => (
          <DayButton 
            key={day} 
            active={activeDay === day}
            onClick={() => setActiveDay(day)}
          >
            {day}
          </DayButton>
        ))}
      </DaysContainer>

      <AnimatePresence mode="wait">
        <ScheduleGrid
          key={activeDay}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          {scheduleData[activeDay].map((c, i) => (
            <ClassCard key={i}>
              <ClassInfo>
                <h4>{c.name}</h4>
                <p>with {c.trainer}</p>
              </ClassInfo>
              <ClassTime>
                <span>{c.time}</span>
                <small>{c.duration}</small>
              </ClassTime>
            </ClassCard>
          ))}
        </ScheduleGrid>
      </AnimatePresence>
    </Section>
  );
};

export default ClassScheduleSection;
