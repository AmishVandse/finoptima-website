import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#1a2b3b',
            fontWeight: 600,
            fontSize: '1.75rem',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: '1.1rem',
            fontWeight: 500
          }}
        >
          Content for {title} will be available soon
        </Typography>
      </Box>
    </>
  );
};

export default PlaceholderPage; 