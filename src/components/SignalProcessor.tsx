import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const SignalProcessor: React.FC = () => {
  const [signalType, setSignalType] = useState<string>('');
  const [signalData, setSignalData] = useState<string>('');
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = () => {
    try {
      // Mock processing
      const mockResult = {
        status: 'success',
        processedData: JSON.parse(signalData),
        timestamp: new Date().toISOString(),
      };
      setResult(mockResult);
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Invalid JSON data',
      });
    }
  };

  return (
    <div className="container">
      <div className="upload-section">
        <h2>Upload Files</h2>
        <input type="file" />
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
          disabled={!signalType || !signalData}
          sx={{ mb: 2 }}
        >
          Process Signal
        </Button>

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
      </div>
    </div>
  );
};

export default SignalProcessor;