// Base request
export const request = async (url, options = {}) => {
    try {
      // Headers
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Access-Control-Allow-Origin', '*')
  
      // Merge options
      const requestOptions = {
        ...options,
        headers,
      }
  
      // Send request
      const response = await fetch(url, requestOptions);
  
      // fetch treats 4xx response as successful
      // so we need to detect and handle error by ourself
      if (response.ok) {
        // Parse reponse to JSON
        return response.json();
      }
  
      // Handle error
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    } catch (error) {
      // Just throw current error
      throw error
    }
  };