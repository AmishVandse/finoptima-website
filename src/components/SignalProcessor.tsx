import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

const SignalProcessor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [signalType, setSignalType] = useState<string>('');
  const [signalData, setSignalData] = useState<string>('');

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        signalType,
        signalData: JSON.parse(signalData),
      };

      const command = new InvokeCommand({
        FunctionName: 'routeFideoSignals',
        Payload: JSON.stringify(payload),
      });

      const response = await lambdaClient.send(command);
      
      if (response.StatusCode === 200) {
        const result = JSON.parse(new TextDecoder().decode(response.Payload));
        setResult(result);
      } else {
        throw new Error('Failed to process signal');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Process Signal
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Signal Type</InputLabel>
          <Select
            value={signalType}
            label="Signal Type"
            onChange={(e) => setSignalType(e.target.value)}
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="audio">Audio</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Signal Data (JSON)"
          value={signalData}
          onChange={(e) => setSignalData(e.target.value)}
          sx={{ mb: 2 }}
          placeholder='{"key": "value"}'
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !signalType || !signalData}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Process Signal'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Response:
            </Typography>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SignalProcessor; 