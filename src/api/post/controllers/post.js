'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post',
    ({ strapi }) => ({

        // Example 1: Creating an entirely custom action
        async exampleAction(ctx) {
            await strapi.service("api::post.post").exampleService({ myParams: "example" })
            try {
                ctx.body = 'ok'
            } catch (err) {
                ctx.body = err
            }
        },


        // async find(ctx) {
        //     ctx.query = { ...ctx.query, locale: "en" };
        //     const result = await super.find(ctx);
        //     result.meta.date = Date.now();

        //     return result;
        // },


        // Example 2: Wrapping a core action (leaves core logic in place)
        async find(ctx) {
            //some custom logic
            ctx.query = { ...ctx.query, locale: "en" };

            //calling the default core action
            const { data, meta } = await super.find(ctx)

            //some more custom logic
            meta.date = Date.now()

            return { data, meta }
        },


        //Example 3: Replace a core action

        async findOne(ctx) {
            const { id } = ctx.params
            const { query } = ctx

            const entity = await strapi.service('api::post.post').findOne(id, query)
            const sanitaizedEntity = await this.sanitizeOutput(entity, ctx)

            return this.transformResponse(sanitaizedEntity)
        },
    })
);
