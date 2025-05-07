// Define the base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Service to handle OCR-related API calls
 */
export const OcrService = {
  /**
   * Send files and metadata to the OCR analysis endpoint
   * @param files Array of files to process
   * @param metadata Additional metadata (emails, phones, socials)
   * @param isRerun Whether this is a rerun of a previous analysis
   * @returns Promise with the API response
   */
  analyzeFiles: async (
    files: File[],
    metadata: {
      emails?: string[];
      phones?: string[];
      socials?: { type: string; value: string }[];
    },
    isRerun: boolean = false
  ) => {
    // Create FormData to send files and metadata
    const formData = new FormData();
    
    // Add files
    files.forEach(file => {
      formData.append('files[]', file);
    });
    
    // Add metadata
    if (metadata.emails && metadata.emails.length > 0) {
      formData.append('emails', JSON.stringify(metadata.emails));
    }
    
    if (metadata.phones && metadata.phones.length > 0) {
      formData.append('phones', JSON.stringify(metadata.phones));
    }
    
    if (metadata.socials && metadata.socials.length > 0) {
      formData.append('socials', JSON.stringify(metadata.socials));
    }
    
    // Add rerun flag
    formData.append('isRerun', String(isRerun));

    // Send to server
    const response = await fetch(`${API_BASE_URL}/api/ocr`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Send only metadata to the OCR endpoint (useful for testing)
   * @param metadata Metadata object
   * @returns Promise with the API response
   */
  analyzeJson: async (metadata: any) => {
    const response = await fetch(`${API_BASE_URL}/api/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return response.json();
  }
};