const path = require('path');

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::cors',
  'strapi::security',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // path.resolve(__dirname, '..', 'src/middlewares/timer-header'), // Абсолютний шлях до middleware
];

