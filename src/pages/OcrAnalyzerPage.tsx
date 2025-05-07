import React, { useRef, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OcrService } from '../services/ApiService';

const socialPlatforms = [
  'Twitter',
  'Facebook',
  'LinkedIn',
  'Instagram',
  'Other',
];

const OcrAnalyzerPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [phones, setPhones] = useState<string[]>([]);
  const [socialType, setSocialType] = useState(socialPlatforms[0]);
  const [socialValue, setSocialValue] = useState('');
  const [socials, setSocials] = useState<{ type: string; value: string }[]>([]);
  
  // Status handling
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // Add email
  const handleAddEmail = () => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  // Add phone
  const handleAddPhone = () => {
    if (phone && !phones.includes(phone)) {
      setPhones([...phones, phone]);
      setPhone('');
    }
  };

  // Add social
  const handleAddSocial = () => {
    if (socialValue && !socials.some(s => s.type === socialType && s.value === socialValue)) {
      setSocials([...socials, { type: socialType, value: socialValue }]);
      setSocialValue('');
    }
  };

  // Remove handlers
  const handleRemoveEmail = (idx: number) => {
    setEmails(emails.filter((_, i) => i !== idx));
  };
  const handleRemovePhone = (idx: number) => {
    setPhones(phones.filter((_, i) => i !== idx));
  };
  const handleRemoveSocial = (idx: number) => {
    setSocials(socials.filter((_, i) => i !== idx));
  };

  // Submit handler
  const handleSubmit = async (isRerun = false) => {
    if (selectedFiles.length === 0 && !isRerun) {
      setError("Please select at least one file");
      setSnackbarOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Create metadata object
      const metadata = {
        emails,
        phones,
        socials,
      };

      // Send to server using our service
      const data = await OcrService.analyzeFiles(selectedFiles, metadata, isRerun);
      setResult(data);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error submitting OCR analysis:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle direct JSON submission (for testing)
  const handleJsonSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create metadata object
      const metadata = {
        emails,
        phones,
        socials,
      };

      // Send as JSON using our service
      const data = await OcrService.analyzeJson(metadata);
      setResult(data);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error submitting OCR analysis:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Upload Files
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Upload ID Documents
        </Typography>
        <Button
          variant="outlined"
          component="label"
          sx={{ mb: 2 }}
        >
          Choose Files
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Box sx={{ ml: 2, display: 'inline', color: 'text.secondary' }}>
          {selectedFiles.length > 0
            ? selectedFiles.map(f => f.name).join(', ')
            : 'No file chosen'}
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
          Optional Fields
        </Typography>
        {/* Emails */}
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Emails
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              placeholder="Add email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddEmail()}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddEmail} sx={{ minWidth: 64 }}>
              Add
            </Button>
          </Grid>
        </Grid>
        <List dense>
          {emails.map((em, idx) => (
            <ListItem key={em} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveEmail(idx)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={em} />
            </ListItem>
          ))}
        </List>
        {/* Phones */}
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Phone Numbers
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              placeholder="Add phone (with country code, e.g., +15552227799)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddPhone()}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddPhone} sx={{ minWidth: 64 }}>
              Add
            </Button>
          </Grid>
        </Grid>
        <List dense>
          {phones.map((ph, idx) => (
            <ListItem key={ph} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemovePhone(idx)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={ph} />
            </ListItem>
          ))}
        </List>
        {/* Social Media */}
        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
          Social Media Profiles
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Platform</InputLabel>
              <Select
                value={socialType}
                label="Platform"
                onChange={e => setSocialType(e.target.value)}
              >
                {socialPlatforms.map(platform => (
                  <MenuItem key={platform} value={platform}>{platform}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              placeholder="Username or URL"
              value={socialValue}
              onChange={e => setSocialValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddSocial()}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddSocial} sx={{ minWidth: 64 }}>
              Add
            </Button>
          </Grid>
        </Grid>
        <List dense>
          {socials.map((soc, idx) => (
            <ListItem key={soc.type + soc.value} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveSocial(idx)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={`${soc.type}: ${soc.value}`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Button 
            fullWidth 
            variant="contained" 
            color="success" 
            size="large"
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Run'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Rerun'}
          </Button>
        </Grid>
      </Grid>

      {/* Results Section */}
      {result && (
        <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Results:
          </Typography>
          <Box 
            component="pre" 
            sx={{ 
              bgcolor: 'background.default', 
              p: 2, 
              borderRadius: 1, 
              overflow: 'auto',
              maxHeight: '300px',
              fontSize: '0.875rem'
            }}
          >
            {JSON.stringify(result, null, 2)}
          </Box>
        </Paper>
      )}

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {error || "OCR analysis completed successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OcrAnalyzerPage;