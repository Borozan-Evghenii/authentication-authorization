import * as requestConfig from './mock';

const mockServerConfig = {
  baseUrl: '/',
  cors: {
    origin: 'http://localhost:5173'
  },
  interceptors: {
    request: ({ setDelay }) => setDelay(1000)
  },
  rest: {
    configs: Object.values(requestConfig)
  }
};

export default mockServerConfig;
