import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ApiUsagePage: React.FC = () => {
  // Mock data for demonstration
  const usageData = {
    totalRequests: 1250,
    successfulRequests: 1200,
    failedRequests: 50,
    averageResponseTime: 45.2,
    lastUpdated: new Date().toLocaleString(),
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        API Usage Statistics
      </Typography>
      
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3} mt={3}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Total Requests
          </Typography>
          <Typography variant="h3">
            {usageData.totalRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Successful Requests
          </Typography>
          <Typography variant="h3" color="success.main">
            {usageData.successfulRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Failed Requests
          </Typography>
          <Typography variant="h3" color="error.main">
            {usageData.failedRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Average Response Time
          </Typography>
          <Typography variant="h3">
            {usageData.averageResponseTime.toFixed(2)}ms
          </Typography>
        </Paper>
      </Box>

      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
          Last Updated: {usageData.lastUpdated}
        </Typography>
      </Box>
    </Box>
  );
};

export default ApiUsagePage;