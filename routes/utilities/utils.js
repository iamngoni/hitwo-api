const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req, res, next) => {
        const authorisationHeader = req.headers.authorisation;
        let result;
        if (authorisationHeader) {
            const token = req.authorisation.split(' ')[1];
            const options = { expiresIn: '2d', issuer: 'https://hitwo-api.herokuapp.com' };
            try {
                result = jwt.verify(token, process.env.JWT_SECRET, options);
                req.decoded = result;
                next();
            } catch (err) {
                throw new Error(err);
            }
        } else {
            result = {
                error: `Authentication error. Token required.`,
                status: 401
            };
            res.status(401).send(result);
        }
    }
};