// rbacMiddleware.js
const roles = require('../config/role');

const checkRole = (action) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (!roles[role] || !roles[role].includes(action)) {
            return res.status(403).send('Forbidden. Insufficient permissions.');
        }
        next();
    };
};

module.exports = { checkRole };
