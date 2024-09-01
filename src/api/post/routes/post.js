'use strict';

/**
 * post router
 */

// @ts-ignore
const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::post.post', {
    // config: {
    //     find: {
    //         policies: [{ name: 'check-role', config: { userRole: 'Author' } }]
    //     }
    // }
});
