# Services Architecture

This folder contains all API service classes for making HTTP requests.

## Structure

### AxiosService (Abstract Base Class)
`AxiosService.js` - Abstract class that provides HTTP methods for all API services.

**Features:**
- Pre-configured axios instance with base URL and headers
- HTTP methods: `get()`, `post()`, `put()`, `delete()`
- Built-in error handling with try/catch
- Logging for debugging
- Can be extended by specific API services

**Usage:**
```javascript
import AxiosService from './AxiosService';

class MyApiService extends AxiosService {
  constructor() {
    super('https://api.example.com');
  }
  
  async getData() {
    return await this.get('/endpoint');
  }
}
```

### MockApiService
`mockApiService.js` - Service for interacting with the MockAPI campers endpoint.

**Features:**
- Extends `AxiosService`
- All requests wrapped in try/catch
- Singleton instance exported
- Methods:
  - `getAllCampers()` - Fetch all campers
  - `getCamperById(id)` - Fetch single camper by ID
  - `filterCampers(filters)` - Filter campers by criteria

**Usage:**
```javascript
import mockApiService from '../services/mockApiService';

// Get all campers
const campers = await mockApiService.getAllCampers();

// Get single camper
const camper = await mockApiService.getCamperById('1');

// Filter campers
const filtered = await mockApiService.filterCampers({
  location: 'Kyiv',
  AC: true,
  form: 'panelTruck'
});
```

## Benefits

1. **Separation of Concerns**: API logic separated from Redux slices
2. **Reusability**: Services can be used across components and slices
3. **Error Handling**: Centralized error handling with try/catch
4. **Maintainability**: Easy to update API endpoints or add new services
5. **Testing**: Services can be easily mocked for unit tests
6. **Type Safety**: Clear API contract through methods

## Adding New Services

To add a new API service:

1. Create a new file in the `services/` folder
2. Extend the `AxiosService` class
3. Pass the base URL to the parent constructor
4. Implement your API methods
5. Export a singleton instance

Example:
```javascript
import AxiosService from './AxiosService';

class NewApiService extends AxiosService {
  constructor() {
    super('https://new-api.com');
  }
  
  async fetchData() {
    try {
      return await this.get('/data');
    } catch (error) {
      console.error('Failed to fetch data:', error.message);
      throw error;
    }
  }
}

const newApiService = new NewApiService();
export default newApiService;
```
