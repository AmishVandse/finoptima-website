import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

interface ApiUsageData {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  lastUpdated: string;
}

const ApiUsagePage: React.FC = () => {
  const [usageData, setUsageData] = useState<ApiUsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiUsage = async () => {
      try {
        console.log('Environment variables:', {
          region: import.meta.env.VITE_AWS_REGION,
          functionName: import.meta.env.VITE_LAMBDA_FUNCTION_NAME
        });

        const lambdaClient = new LambdaClient({
          region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
          credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
          },
        });

        const command = new InvokeCommand({
          FunctionName: import.meta.env.VITE_LAMBDA_FUNCTION_NAME || 'get-api-usage',
          Payload: JSON.stringify({}),
        });

        console.log('Invoking Lambda function...');
        const response = await lambdaClient.send(command);
        console.log('Lambda response:', response);

        const payload = JSON.parse(new TextDecoder().decode(response.Payload));
        console.log('Decoded payload:', payload);
        
        if (payload.errorMessage) {
          throw new Error(payload.errorMessage);
        }

        setUsageData(payload);
        setError(null);
      } catch (err) {
        console.error('Error fetching API usage:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch API usage data');
      } finally {
        setLoading(false);
      }
    };

    fetchApiUsage();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
            {usageData?.totalRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Successful Requests
          </Typography>
          <Typography variant="h3" color="success.main">
            {usageData?.successfulRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Failed Requests
          </Typography>
          <Typography variant="h3" color="error.main">
            {usageData?.failedRequests.toLocaleString()}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Average Response Time
          </Typography>
          <Typography variant="h3">
            {usageData?.averageResponseTime.toFixed(2)}ms
          </Typography>
        </Paper>
      </Box>

      <Box mt={3}>
        <Typography variant="body2" color="textSecondary">
          Last Updated: {usageData?.lastUpdated}
        </Typography>
      </Box>
    </Box>
  );
};

export default ApiUsagePage; 