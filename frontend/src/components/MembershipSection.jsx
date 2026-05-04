import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Section = styled.section`
  padding: 120px 8%;
  background: #0a0a0a;
  text-align: center;
`;

const Header = styled.div`
  margin-bottom: 80px;
`;

const Badge = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.9rem;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -2px;
  margin-top: 15px;
  text-transform: uppercase;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 60px 40px;
  border-radius: 24px;
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.isBest ? props.theme.colors.secondary : 'transparent'};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const PlanName = styled.h3`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: #fff;
  text-transform: uppercase;
`;

const Price = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 40px;
  color: #fff;
  span { font-size: 1.1rem; color: #666; font-weight: 600; margin-left: 5px; }
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 50px;
  flex-grow: 1;
`;

const Feature = styled.li`
  padding: 12px 0;
  color: #a0a0a0;
  font-weight: 500;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '✓';
    color: ${props => props.theme.colors.secondary};
    margin-right: 15px;
    font-weight: 900;
  }
`;

const SelectBtn = styled(motion.button)`
  width: 100%;
  padding: 20px;
  background: ${props => props.isBest ? props.theme.colors.secondary : 'rgba(255,255,255,0.05)'};
  color: ${props => props.isBest ? '#000' : '#fff'};
  border: 1px solid ${props => props.isBest ? 'transparent' : 'rgba(255,255,255,0.1)'};
  border-radius: 14px;
  font-weight: 800;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const MembershipSection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fallbackPlans = [
    { name: 'Basic', priceMonthly: 29, benefits: ['Daily Gym Access', 'Standard Locker', 'Fitness Assessment'], isBest: false },
    { name: 'Elite', priceMonthly: 79, benefits: ['24/7 Access', 'Private Locker', 'Personal Trainer', 'Nutrition Plan'], isBest: true },
    { name: 'Pro', priceMonthly: 149, benefits: ['All Gym Locations', 'Spa & Sauna', 'Guest Passes', 'Recovery Zone'], isBest: false },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/memberships');
        if (res.data && res.data.length > 0) {
          setPlans(res.data);
        } else {
          setPlans(fallbackPlans);
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePurchase = async (plan) => {
    if (!user) {
      alert("Please login to purchase a membership.");
      navigate('/login');
      return;
    }

    try {
      const orderRes = await api.post('/payment/orders', {
        amount: plan.priceMonthly,
        planName: plan.name
      });
      
      const { order, planName, isMock, key_id } = orderRes.data;

      // DEMO MODE: If no valid Razorpay keys exist in backend, it sends isMock: true
      if (isMock) {
        const confirmDemo = window.confirm(`[DEMO MODE] Proceed with dummy payment of ₹${plan.priceMonthly * 80} for ${plan.name} plan?`);
        if (!confirmDemo) return;

        // Automatically simulate verification success
        const verifyRes = await api.post('/payment/verify', {
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_order_id: order.id,
          razorpay_signature: 'mock_signature_123',
          amount: plan.priceMonthly,
          planName
        });

        if (verifyRes.data.success) {
          alert(`Successfully purchased ${plan.name} plan (Demo Mode)!`);
          navigate('/profile');
          window.location.reload(); 
        }
        return;
      }

      // REAL MODE: Open Razorpay
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: key_id, // Dynamically injected from backend
        amount: order.amount,
        currency: order.currency,
        name: "GymFitness Elite",
        description: `${planName} Plan Purchase`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/payment/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amount: plan.priceMonthly,
              planName
            });
            if (verifyRes.data.success) {
              alert(`Successfully purchased ${plan.name} plan!`);
              navigate('/profile');
              window.location.reload(); 
            }
          } catch (err) {
            console.error('Payment verification failed:', err);
            alert("Payment Verification Failed. Contact Support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999" 
        },
        theme: {
          color: "#ccff00"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error('Error initiating payment:', err);
      alert('Could not initiate payment. Please try again.');
    }
  };

  return (
    <Section id="membership">
      <Header>
        <Badge>Pricing Plans</Badge>
        <Title>Invest in your body</Title>
      </Header>
      <Grid>
        {plans.map((p, i) => (
          <Card 
            key={i}
            isBest={p.isBest}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <PlanName>{p.name}</PlanName>
            <Price>₹{p.priceMonthly * 80}<span>/mo</span></Price>
            <FeatureList>
              {p.benefits && p.benefits.map((f, j) => <Feature key={j}>{f}</Feature>)}
            </FeatureList>
            <SelectBtn 
              isBest={p.isBest}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePurchase(p)}
            >
              Get Started
            </SelectBtn>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default MembershipSection;
