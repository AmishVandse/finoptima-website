import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import SignalProcessor from '../components/SignalProcessor';

const OcrAnalyzerPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          OCR Analyzer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Process and analyze signals using AWS Lambda
        </Typography>
      </Paper>
      <SignalProcessor />
    </Box>
  );
};

export default OcrAnalyzerPage; 