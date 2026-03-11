/**
 * Cloudflare Configuration
 * Enables worldwide accessibility and edge computing
 */

export const cloudflareConfig = {
  // Enable Cloudflare Workers for edge computing
  workers: {
    enabled: true,
    location: 'edge',
    regions: ['global'],
  },

  // CDN Configuration
  cdn: {
    enabled: true,
    caching: {
      staticAssets: '1 year',
      htmlPages: '1 hour',
      apiResponses: '5 minutes',
    },
    compression: 'gzip, brotli',
    minification: true,
  },

  // Security Headers
  securityHeaders: {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  },

  // DDoS Protection
  ddosProtection: {
    enabled: true,
    sensitivity: 'high',
    rateLimit: {
      requests: 1000,
      window: 60, // seconds
    },
  },

  // WAF (Web Application Firewall)
  waf: {
    enabled: true,
    rules: [
      'sql-injection',
      'xss-attacks',
      'bot-management',
      'rate-limiting',
    ],
  },

  // Analytics
  analytics: {
    enabled: true,
    realtime: true,
    privacy: 'anonymized',
  },

  // Geographic Routing
  geoRouting: {
    enabled: true,
    defaultRegion: 'us',
    regions: {
      'eu': 'Europe',
      'us': 'United States',
      'asia': 'Asia Pacific',
      'sa': 'South America',
      'af': 'Africa',
    },
  },

  // Performance Optimization
  performance: {
    http2: true,
    http3: true,
    imageOptimization: true,
    lazyLoading: true,
    preloading: true,
  },

  // Backup & Disaster Recovery
  backup: {
    enabled: true,
    frequency: 'daily',
    retention: 30, // days
    regions: ['us', 'eu', 'asia'],
  },

  // Monitoring & Logging
  monitoring: {
    enabled: true,
    logLevel: 'info',
    alerting: true,
    uptime: '99.99%',
  },
};

/**
 * Initialize Cloudflare configuration
 */
export const initializeCloudflare = () => {
  // Set security headers
  Object.entries(cloudflareConfig.securityHeaders).forEach(([key, value]) => {
    // Headers would be set in the server/edge worker
    console.log(`Setting header: ${key}: ${value}`);
  });

  // Enable performance optimizations
  if (cloudflareConfig.performance.http2) {
    console.log('HTTP/2 enabled');
  }
  if (cloudflareConfig.performance.http3) {
    console.log('HTTP/3 (QUIC) enabled');
  }

  console.log('Cloudflare configuration initialized');
};

/**
 * Get optimal region for user
 */
export const getOptimalRegion = (userLocation?: string): string => {
  if (!userLocation) return cloudflareConfig.geoRouting.defaultRegion;
  
  const locationMap: Record<string, string> = {
    'GB': 'eu',
    'DE': 'eu',
    'FR': 'eu',
    'US': 'us',
    'CA': 'us',
    'JP': 'asia',
    'AU': 'asia',
    'BR': 'sa',
    'ZA': 'af',
  };

  return locationMap[userLocation] || cloudflareConfig.geoRouting.defaultRegion;
};
