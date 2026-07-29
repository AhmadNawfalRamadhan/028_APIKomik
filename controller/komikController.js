const db = require('../models');

const includeGenre = {
    model: db.genre,
    as: 'genre', // Sesuaikan dengan alias di relasi modelmu (jika ada)
    attributes: ['id', 'nama_genre'] // Pilih field yang ingin ditampilkan saja
};

async function getAllKomik(req, res) {
    try {
        const komik = await db.komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
       console.error('Error fetching komik by ID:', err.message);
       res.status(500).json({ error: 'Failed to fetch komik by ID' });
    }
}

async function createKomik(req, res) {
    const { title, description, author, genre_id } = req.body;
    try {
        const newKomik = await db.komik.create({ title, description, author, genre_id });
        await newKomik.reload({ include: [includeGenre] });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Failed to create komik' });
    }   
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author, genre_id } = req.body;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        await komik.update({
            title: title !== undefined ? title : komik.title,
            description: description !== undefined ? description : komik.description,
            author: author !== undefined ? author : komik.author,
            genre_id: genre_id !== undefined ? genre_id : komik.genre_id
        });

        await komik.reload({ include: [includeGenre] });

        return res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Failed to update komik' });
    }   
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik deleted successfully' });
    } catch (err) {
        console.error('Error deleting komik:', err.message);
        res.status(500).json({ error: 'Failed to delete komik' });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};