import axios from 'axios';

/**
 * Abstract Axios service class that provides HTTP methods
 * All API services should extend this class
 */
class AxiosService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });
  }

  /**
   * GET request
   * @param {string} url - The endpoint URL
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * POST request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  async post(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * PUT request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  async put(url, data = {}, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * DELETE request
   * @param {string} url - The endpoint URL
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Error handler - can be overridden in child classes
   * @param {Error} error - The error object
   */
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || error.message,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', {
        message: 'No response received from server',
        url: error.config?.url,
      });
    } else {
      // Something else happened
      console.error('Request Error:', error.message);
    }
  }
}

export default AxiosService;
