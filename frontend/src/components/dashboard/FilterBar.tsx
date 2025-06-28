import React from 'react';
import { MenuItem, Select, Box, Button } from '@mui/material';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  search: string;
  setSearch: (s: string) => void;
  selectedUser: string;
  setSelectedUser: (u: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  userList: string[];
  categoryList: string[];
  statusList: string[];
  downloadCSV: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedUser, 
  setSelectedUser, 
  selectedCategory, 
  setSelectedCategory, 
  selectedStatus, 
  setSelectedStatus, 
  userList, 
  categoryList, 
  statusList,
  downloadCSV 
}) => (
  <Box className={styles.filterBar}>
    <Select
      value={selectedUser}
      onChange={e => setSelectedUser(e.target.value)}
      className={styles.select + ' ' + styles.userSelect}
      MenuProps={{
        PaperProps: {
          className: styles.menuPaper + ' ' + styles.userMenu,
        },
      }}
    >
      <MenuItem value="All">All Users</MenuItem>
      {userList.map(user => (
        <MenuItem key={user} value={user}>{user}</MenuItem>
      ))}
    </Select>
    <Select
      value={selectedCategory}
      onChange={e => setSelectedCategory(e.target.value)}
      className={styles.select + ' ' + styles.categorySelect}
      MenuProps={{
        PaperProps: {
          className: styles.menuPaper + ' ' + styles.categoryMenu,
        },
      }}
    >
      <MenuItem value="All">All Categories</MenuItem>
      {categoryList.map(cat => (
        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
      ))}
    </Select>
    <Select
      value={selectedStatus}
      onChange={e => setSelectedStatus(e.target.value)}
      className={styles.select + ' ' + styles.statusSelect}
      MenuProps={{
        PaperProps: {
          className: styles.menuPaper + ' ' + styles.statusMenu,
        },
      }}
    >
      <MenuItem value="All">All Statuses</MenuItem>
      {statusList.map(status => (
        <MenuItem key={status} value={status}>{status}</MenuItem>
      ))}
    </Select>
    <Button 
      onClick={downloadCSV}
      variant="contained"
      sx={{
        background: '#9c27b0',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 22px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '0 2px 8px 0 #000',
        transition: 'background 0.15s, transform 0.15s',
        '&:hover': {
          background: '#7b1fa2',
          transform: 'translateY(-2px)'
        }
      }}
    >
      Download CSV
    </Button>
  </Box>
);

export default FilterBar; 