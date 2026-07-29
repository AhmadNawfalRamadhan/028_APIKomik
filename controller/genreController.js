// Import model genre dari folder models
const { genre } = require('../models');

const genreController = {
    // 1. GET: Mengambil semua data genre
    getAllGenres: async (req, res) => {
        try {
            const data = await genre.findAll();
            return res.status(200).json({
                message: "Berhasil mengambil data genre",
                data: data
            });
        } catch (error) {
            return res.status(500).json({ 
                message: "Terjadi kesalahan pada server", 
                error: error.message 
            });
        }
    },

    // 2. POST: Menambahkan genre baru
    createGenre: async (req, res) => {
        try {
            const { nama_genre } = req.body;

            // Validasi input
            if (!nama_genre) {
                return res.status(400).json({ 
                    message: "nama_genre wajib diisi!" 
                });
            }

            const newGenre = await genre.create({ 
                nama_genre: nama_genre 
            });

            return res.status(201).json({
                message: "Genre berhasil ditambahkan",
                data: newGenre
            });
        } catch (error) {
            return res.status(500).json({ 
                message: "Terjadi kesalahan pada server", 
                error: error.message 
            });
        }
    },

    // 3. PUT: Mengubah data genre berdasarkan ID
    updateGenre: async (req, res) => {
        try {
            const { id } = req.params;
            const { nama_genre } = req.body;

            // Cari genre berdasarkan ID
            const findGenre = await genre.findByPk(id);

            // Jika genre tidak ditemukan
            if (!findGenre) {
                return res.status(404).json({ 
                    message: "Genre tidak ditemukan" 
                });
            }

            // Lakukan pembaruan
            await findGenre.update({ 
                nama_genre: nama_genre || findGenre.nama_genre 
            });

            return res.status(200).json({
                message: "Genre berhasil diperbarui",
                data: findGenre
            });
        } catch (error) {
            return res.status(500).json({ 
                message: "Terjadi kesalahan pada server", 
                error: error.message 
            });
        }
    },

    // 4. DELETE: Menghapus data genre berdasarkan ID
    deleteGenre: async (req, res) => {
        try {
            const { id } = req.params;

            // Cari genre berdasarkan ID
            const findGenre = await genre.findByPk(id);

            // Jika genre tidak ditemukan
            if (!findGenre) {
                return res.status(404).json({ 
                    message: "Genre tidak ditemukan" 
                });
            }

            // Hapus data
            await findGenre.destroy();

            return res.status(200).json({
                message: "Genre berhasil dihapus"
            });
        } catch (error) {
            return res.status(500).json({ 
                message: "Terjadi kesalahan pada server", 
                error: error.message 
            });
        }
    }
};

module.exports = genreController;