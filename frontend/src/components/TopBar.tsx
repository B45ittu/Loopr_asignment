import React, { useState } from 'react';
import { Box, InputBase, Avatar, IconButton, Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloseIcon from '@mui/icons-material/Close';

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return { name: payload.name || '', email: payload.email || '' };
  } catch {
    return null;
  }
}

interface TopBarProps {
  onLogout?: () => void;
  search: string;
  setSearch: (s: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const user = getUserFromToken();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2, bgcolor: '#181c23', borderBottom: '1px solid #232733' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#232733', borderRadius: 2, px: 2, py: 0.5, minWidth: 280 }}>
        <SearchIcon sx={{ color: '#9c27b0', mr: 1 }} />
        <InputBase
          placeholder="Search..."
          sx={{ color: '#fff', width: '100%' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ color: '#9c27b0' }}>
          <NotificationsNoneIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: '#232733', width: 40, height: 40, cursor: 'pointer', boxShadow: '0 2px 12px 0 #9c27b055' }} onClick={() => setOpen(true)}>
          {user && user.name ? user.name[0].toUpperCase() : 'U'}
        </Avatar>
        {onLogout && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={onLogout}
            sx={{ ml: 2, borderColor: '#9c27b0', color: '#fff', '&:hover': { borderColor: '#7b1fa2', bgcolor: '#232733' } }}
          >
            Logout
          </Button>
        )}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              background: 'rgba(34, 30, 60, 0.55)',
              backdropFilter: 'blur(18px) saturate(180%)',
              WebkitBackdropFilter: 'blur(18px) saturate(180%)',
              borderRadius: 4,
              boxShadow: '0 8px 32px 0 #9c27b055, 0 1.5px 8px 0 #b388ff44',
              border: '1.5px solid rgba(180, 136, 255, 0.22)',
              minWidth: 340,
              p: 0,
              overflow: 'visible',
            },
          }}
        >
          <Box sx={{ position: 'absolute', right: 12, top: 12 }}>
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ color: '#fff', bgcolor: 'rgba(156,39,176,0.18)', '&:hover': { bgcolor: 'rgba(156,39,176,0.28)' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <DialogTitle sx={{ textAlign: 'center', color: '#fff', fontWeight: 700, fontSize: 24, letterSpacing: 1, mt: 2, mb: 0 }}>
            User Profile
          </DialogTitle>
          <DialogContent>
            <Stack alignItems="center" spacing={2} sx={{ mt: 1, mb: 2 }}>
              <Avatar sx={{ width: 72, height: 72, bgcolor: '#9c27b0', color: '#fff', fontWeight: 700, fontSize: 36, boxShadow: '0 4px 24px 0 #9c27b055' }}>
                {user && user.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, letterSpacing: 0.5 }}>
                {user?.name || 'Unknown'}
              </Typography>
              <Typography variant="body1" sx={{ color: '#e1bee7', fontWeight: 500, fontSize: 16 }}>
                {user?.email || 'Unknown'}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
            <Button onClick={() => setOpen(false)} variant="contained" sx={{ bgcolor: '#9c27b0', color: '#fff', borderRadius: 2, px: 4, fontWeight: 600, boxShadow: '0 2px 8px 0 #9c27b055', '&:hover': { bgcolor: '#7b1fa2' } }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TopBar; 