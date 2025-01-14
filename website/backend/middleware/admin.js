const connection = require('../config/db');

module.exports = (req, res, next) => {
    const userId = req.user.userId; // Extracted from JWT in auth middleware

    const query = 'SELECT isAdmin FROM users WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
        if (error || results.length === 0) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { isAdmin } = results[0];
        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    });
};
