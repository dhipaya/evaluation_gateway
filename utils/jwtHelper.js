// jwtHelpers.js
const generateToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
    };
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = { generateToken };
