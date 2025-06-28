import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
  { label: 'Transactions', icon: <MonetizationOnIcon />, path: '/transactions' },
  { label: 'Wallet', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
  { label: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
  { label: 'Personal', icon: <PersonIcon />, path: '/personal' },
  { label: 'Message', icon: <MessageIcon />, path: '/message' },
  { label: 'Setting', icon: <SettingsIcon />, path: '/setting' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <Box sx={{ width: 90, bgcolor: '#181c23', color: '#fff', py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', borderRight: '1px solid #232733' }}>
      <Avatar sx={{ bgcolor: '#232733', width: 48, height: 48, mb: 4, fontWeight: 700, fontSize: 24 }}>J</Avatar>
      <List sx={{ width: '100%' }}>
        {navItems.map((item, idx) => (
          <ListItem key={item.label} disablePadding sx={{ justifyContent: 'center' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                justifyContent: 'center',
                borderRadius: 2,
                my: 0.5,
                bgcolor: location.pathname === item.path ? 'rgba(156,39,176,0.15)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(156,39,176,0.10)' },
                minHeight: 48,
              }}
            >
              <ListItemIcon sx={{ color: '#9c27b0', minWidth: 0 }}>{item.icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 