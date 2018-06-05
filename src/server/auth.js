const uuid = require('uuid-random');

module.exports = {
    /**
     * Authenticate the agent and return
     * some user context.
     */
    authenticate: (req) => { 
        // Add auth here :)

         return Promise.resolve({
             userId: uuid()
         });
    }
}