import React from 'react';
import SignUpForm from '../components/SignUpForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SignUpPageProps {
  onSignUpSuccess: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUpSuccess }) => {
  const navigate = useNavigate();

  const handleSignUp = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Sign up failed');
    }
    // Optionally store token: localStorage.setItem('token', data.token);
    onSignUpSuccess();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f6fa' }}>
      <SignUpForm onSignUp={handleSignUp} />
    </Box>
  );
};

export default SignUpPage;
