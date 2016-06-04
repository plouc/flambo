const router = require('express').Router();

module.exports = container => {
    
    router.get('/', (req, res) => {
        res.json([]);
    });


    router.get('/:id', (req, res, next) => {

    });

    return router;
};
