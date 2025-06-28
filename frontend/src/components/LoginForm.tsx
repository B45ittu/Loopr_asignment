import React, { useState } from 'react';
import { Box, Avatar, Typography, TextField, Button, Alert, CircularProgress, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
        my: 6,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: 'rgba(156, 39, 176, 0.08)', // light purple only, no white
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 64, height: 64, mb: 2, bgcolor: 'purple.400', color: 'white' }}>
        <PersonIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" fontWeight={700} mb={3} color="purple">
        Login
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        autoComplete="email"
        color="secondary"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        autoComplete="current-password"
        color="secondary"
      />
      {error && (
        <Alert severity="error" sx={{ width: '100%', my: 1 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{ mt: 2, fontWeight: 700, fontSize: 17, borderRadius: 2, bgcolor: 'purple.500', '&:hover': { bgcolor: 'purple.700' } }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?
        </Typography>
        <Link to="/signup" style={{ color: '#8e24aa', textDecoration: 'underline', fontWeight: 600 }}>
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginForm;
