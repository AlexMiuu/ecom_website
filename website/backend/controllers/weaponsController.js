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

exports.deleteWeapon = (req, res) => {
    const { id } = req.params; // Extract weapon ID from URL parameters

    // Validate the presence of the ID
    if (!id) {
        return res.status(400).json({ message: 'ID-ul armei este necesar pentru ștergere.' });
    }

    const query = 'DELETE FROM weapons WHERE id = ?'; // SQL query to delete the weapon

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Eroare la ștergerea armei:', error);
            return res.status(500).json({ message: 'Eroare la ștergerea armei.', error });
        }

        // Check if any rows were affected (i.e., if the weapon existed)
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Armă nu a fost găsită.' });
        }

        res.status(200).json({ message: 'Armă ștearsă cu succes!' });
    });
};