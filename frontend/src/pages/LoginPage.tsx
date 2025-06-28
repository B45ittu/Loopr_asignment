import React from 'react';
import LoginForm from '../components/LoginForm';
// import styles from '../css/loginPage.module.css';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    localStorage.setItem('token', data.token);
    onLoginSuccess();
    navigate('/home');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f6fa' }}>
      <LoginForm onLogin={handleLogin} />
    </Box>
  );
};

export default LoginPage;
