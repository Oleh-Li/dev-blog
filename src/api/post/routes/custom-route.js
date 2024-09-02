module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/posts/example',
            handler: "api::post.post.exampleAction",
            config: {
                //some configuration
            }
        },
    ]
}