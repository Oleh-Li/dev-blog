// @ts-nocheck
'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post',
    ({ strapi }) => ({

        ////////from lesson about premium post
        ////first variant (simpliest but worst)
        // async find(ctx) {
        //     //fetch all posts
        //     const { data, meta } = await super.find(ctx)
        //     if (ctx.state.user) return { data, meta }

        //     //for no authenticated
        //     const filteredData = data.filter(post => !post.attributes.premium)
        //     return { data: filteredData, meta }
        // },

        //second solution 
        // async find(ctx) {
        //     //if authenticated
        //     const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium["$eq"] == "false"
        //     if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)

        //     //if not authenticated... that mean public
        //     ////and use for it underlying service with additional filter params
        //     const { query } = ctx
        //     const filteredPost = await strapi.service("api::post.post").find({
        //         ...query,
        //         filters: {
        //             ...query.filters,
        //             premium: false
        //         }
        //     })
        //     const sanitaizedPosts = await this.sanitizeOutput(filteredPost, ctx)
        //     return this.transformResponse(sanitaizedPosts)
        // },

        //third solution
        async find(ctx) {
            //if authenticated or explicity asking for public content only
            const isRequestingNonPremium = ctx.query.filters && ctx.query.filters.premium["$eq"] == false
            console.log("isRequestingNonPremium:", isRequestingNonPremium);
            if (ctx.state.user || isRequestingNonPremium) return await super.find(ctx)

            //if not authenticated... that mean public
            console.log("Fetching public posts...");
            const publicPosts = await strapi
                .service("api::post.post")
                .findPublic(ctx.query)
            const sanitaizedPosts = await this.sanitizeOutput(publicPosts, ctx)
            return this.transformResponse(sanitaizedPosts)
        },

        ///////////from lesson about custom controllers
        // Example 1: Creating an entirely custom action
        async exampleAction(ctx) {
            await strapi.service("api::post.post").exampleService({ myParams: "example" })
            try {
                ctx.body = 'ok'
            } catch (err) {
                ctx.body = err
            }
        },

        // Example 2: Wrapping a core action (leaves core logic in place)
        // async find(ctx) {
        //     //some custom logic
        //     ctx.query = { ...ctx.query, locale: "en" };

        //     //calling the default core action
        //     const { data, meta } = await super.find(ctx)

        //     //some more custom logic
        //     meta.date = Date.now()

        //     return { data, meta }
        // },


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
