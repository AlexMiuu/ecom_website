const connection = require('../config/db');

exports.getAllWeapons = (req, res) => {
    const query = 'SELECT * FROM weapons';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Eroare la obținerea armelor', error });
        }
        res.status(200).json(results);
    });
};

exports.createWeapon = (req, res) => {
    const { name, type, damage, range, weight, price, description } = req.body;
    const query = 'INSERT INTO weapons (name, type, damage, rng, weight, price, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, type, damage, range, weight, price, description], (error) => {
        if (error) {
            return res.status(500).json({ message: 'Eroare la adăugarea armei', error });
        }
        res.status(201).json({ message: 'Armă adăugată cu succes!' });
    });
};
