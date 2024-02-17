const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        year: 'required|string',
        pages: 'string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).sen({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {saveBook};