
// ... (previous code)

// Handle binary file upload (application/octet-stream or specific file types)
if (contentType.includes('application/octet-stream') || 
    contentType.includes('image/') || 
    contentType.includes('application/pdf') ||
    contentType.includes('application/msword') ||
    contentType.includes('application/vnd.openxmlformats-officedocument')) {
  
  try {
    console.log('Processing binary file upload for exam card');
    
    // ... (rest of the code)
  } catch (uploadError) {
    console.error('Error uploading binary file for exam card:', uploadError);
    return c.json({
      error: 'Failed to upload binary file for exam card',
      details: uploadError.message
    }, 500);
  }
} 
// ... (rest of the code)
