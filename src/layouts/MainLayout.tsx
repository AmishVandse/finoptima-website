import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Code as CodeIcon,
  VpnKey as VpnKeyIcon,
  Description as DescriptionIcon,
  ImageSearch as ImageSearchIcon,
} from '@mui/icons-material';

const drawerWidth = 280;
const finOptimaBlue = '#00B4FF'; 

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'API Usage', icon: <CodeIcon />, path: '/api-usage' },
  { text: 'API Keys', icon: <VpnKeyIcon />, path: '/api-keys' },
  { text: 'API Documentation', icon: <DescriptionIcon />, path: '/api-documentation' },
  { text: 'OCR Analyzer', icon: <ImageSearchIcon />, path: '/ocr-analyzer' },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
            borderRight: 'none',
            boxShadow: '0 0 20px rgba(0,0,0,0.05)',
          },
        }}
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            mb: 2,
            borderBottom: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <Typography 
            variant="h4" 
            component="div"
            sx={{
              color: '#1a2b3b',
              fontSize: '1.75rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              mb: 1
            }}
          >
            FinOptima
          </Typography>
          <Typography 
            variant="subtitle1" 
            component="div"
            sx={{
              color: finOptimaBlue,
              fontSize: '1.1rem',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}
          >
            Solutions
          </Typography>
        </Toolbar>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                cursor: 'pointer',
                color: '#1a2b3b',
                borderRadius: '8px',
                mb: 1,
                transition: 'all 0.2s ease',
                backgroundColor: location.pathname === item.path ? `${finOptimaBlue}08` : 'transparent',
                '&:hover': {
                  backgroundColor: `${finOptimaBlue}15`,
                },
                '& .MuiListItemIcon-root': {
                  color: location.pathname === item.path ? finOptimaBlue : '#64748b',
                  minWidth: '40px',
                  transition: 'all 0.2s ease',
                },
                '& .MuiListItemText-primary': {
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  transition: 'all 0.2s ease',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f8fafc',
          minHeight: '100vh',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 