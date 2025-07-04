import React, { useState } from 'react';
import { Box, Avatar, Typography, TextField, Button, Alert, CircularProgress, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface SignUpFormProps {
  onSignUp: (name: string, email: string, password: string) => Promise<void>;
}

function getPasswordRequirements(password: string) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSignUp(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
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
        <PersonAddIcon fontSize="large" />
      </Avatar>
      <Typography variant="h5" fontWeight={700} mb={3} color="purple">
        Sign Up
      </Typography>
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
        autoComplete="name"
        color="secondary"
      />
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
        autoComplete="new-password"
        color="secondary"
      />
      {/* Password requirements checklist */}
      <Box sx={{ width: '100%', mb: 1, mt: -1 }}>
        {(() => {
          const req = getPasswordRequirements(password);
          return (
            <>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Password must contain:
              </Typography>
              <Stack direction="column" spacing={0.5} sx={{ mt: 0.5 }}>
                <Typography variant="caption" color={req.length ? 'success.main' : 'text.secondary'}>
                  {req.length ? <CheckCircleIcon fontSize="inherit" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <CancelIcon fontSize="inherit" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}At least 8 characters
                </Typography>
                <Typography variant="caption" color={req.uppercase ? 'success.main' : 'text.secondary'}>
                  {req.uppercase ? <CheckCircleIcon fontSize="inherit" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <CancelIcon fontSize="inherit" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}One uppercase letter
                </Typography>
                <Typography variant="caption" color={req.lowercase ? 'success.main' : 'text.secondary'}>
                  {req.lowercase ? <CheckCircleIcon fontSize="inherit" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <CancelIcon fontSize="inherit" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}One lowercase letter
                </Typography>
                <Typography variant="caption" color={req.number ? 'success.main' : 'text.secondary'}>
                  {req.number ? <CheckCircleIcon fontSize="inherit" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <CancelIcon fontSize="inherit" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}One number
                </Typography>
                <Typography variant="caption" color={req.special ? 'success.main' : 'text.secondary'}>
                  {req.special ? <CheckCircleIcon fontSize="inherit" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <CancelIcon fontSize="inherit" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}One special character
                </Typography>
              </Stack>
            </>
          );
        })()}
      </Box>
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
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
        </Typography>
        <Link to="/login" style={{ color: '#8e24aa', textDecoration: 'underline', fontWeight: 600 }}>
          Login
        </Link>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
