import AxiosService from './AxiosService';

/**
 * MockAPI service for campers API
 * Extends AxiosService to inherit HTTP methods
 */
class MockApiService extends AxiosService {
  constructor() {
    super('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io');
  }

  /**
   * Fetch all campers
   * @returns {Promise<Array>} List of all campers
   */
  async getAllCampers() {
    try {
      const data = await this.get('/campers');
      return data.items || [];
    } catch (error) {
      console.error('Failed to fetch campers:', error.message);
      throw new Error('Failed to fetch campers. Please try again later.');
    }
  }

  /**
   * Fetch a single camper by ID
   * @param {string} id - Camper ID
   * @returns {Promise<Object>} Camper object
   */
  async getCamperById(id) {
    try {
      const data = await this.get(`/campers?id=${id}`);
      const items = data.items || [];
      const camper = items.find(item => item.id === id);
      
      if (!camper) {
        throw new Error('Camper not found');
      }
      
      return camper;
    } catch (error) {
      if (error.message === 'Camper not found') {
        throw error;
      }
      console.error('Failed to fetch camper by ID:', error.message);
      throw new Error('Failed to fetch camper details. Please try again later.');
    }
  }

  /**
   * Filter campers by criteria
   * @param {Object} filters - Filter criteria
   * @param {string} filters.location - Location filter
   * @param {string} filters.form - Vehicle form/type
   * @param {boolean} filters.AC - Has AC
   * @param {boolean} filters.transmission - Has automatic transmission
   * @param {boolean} filters.kitchen - Has kitchen
   * @param {boolean} filters.TV - Has TV
   * @param {boolean} filters.bathroom - Has bathroom
   * @returns {Promise<Array>} Filtered list of campers
   */
  async filterCampers(filters = {}) {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      // Add location filter
      if (filters.location && filters.location.trim() !== '') {
        params.append('location', filters.location.trim());
      }
      
      // Add form filter
      if (filters.form && filters.form !== '') {
        params.append('form', filters.form);
      }
      
      // Add equipment filters
      if (filters.AC === true) {
        params.append('AC', 'true');
      }
      
      if (filters.transmission === true) {
        params.append('transmission', 'automatic');
      }
      
      if (filters.kitchen === true) {
        params.append('kitchen', 'true');
      }
      
      if (filters.TV === true) {
        params.append('TV', 'true');
      }
      
      if (filters.bathroom === true) {
        params.append('bathroom', 'true');
      }
      
      // Build URL with query parameters
      const queryString = params.toString();
      const url = queryString ? `/campers?${queryString}` : '/campers';
      
      // Make request with query parameters
      const data = await this.get(url);
      const items = data.items || [];
      
      // Apply client-side filtering as backup (since MockAPI may not support all query params)
      let filteredItems = items;
      
      // Filter by location (case-insensitive, partial match)
      if (filters.location && filters.location.trim() !== '') {
        const locationSearch = filters.location.toLowerCase().trim();
        filteredItems = filteredItems.filter(item => 
          item.location.toLowerCase().includes(locationSearch)
        );
      }
      
      // Filter by form (exact match)
      if (filters.form && filters.form !== '') {
        filteredItems = filteredItems.filter(item => item.form === filters.form);
      }
      
      // Filter by AC
      if (filters.AC === true) {
        filteredItems = filteredItems.filter(item => item.AC === true);
      }
      
      // Filter by transmission (automatic)
      if (filters.transmission === true) {
        filteredItems = filteredItems.filter(item => item.transmission === 'automatic');
      }
      
      // Filter by kitchen
      if (filters.kitchen === true) {
        filteredItems = filteredItems.filter(item => item.kitchen === true);
      }
      
      // Filter by TV
      if (filters.TV === true) {
        filteredItems = filteredItems.filter(item => item.TV === true);
      }
      
      // Filter by bathroom
      if (filters.bathroom === true) {
        filteredItems = filteredItems.filter(item => item.bathroom === true);
      }
      
      return filteredItems;
    } catch (error) {
      console.error('Failed to filter campers:', error.message);
      
      // Handle 404 Not Found errors
      if (error.response?.status === 404) {
        return []; // Return empty array for no results
      }
      
      throw new Error('Failed to filter campers. Please try again later.');
    }
  }

  /**
   * Override error handler for specific MockAPI error handling
   * @param {Error} error - The error object
   */
  handleError(error) {
    // Call parent error handler first
    super.handleError(error);
    
    // Add specific MockAPI error handling if needed
    if (error.response?.status === 429) {
      console.error('MockAPI: Rate limit exceeded. Please wait before making more requests.');
    }
  }
}

// Export singleton instance
const mockApiService = new MockApiService();
export default mockApiService;
