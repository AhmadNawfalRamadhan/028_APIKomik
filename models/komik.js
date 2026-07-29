module.exports = (sequelize, DataTypes) => {
    const komik = sequelize.define('komik', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        // TAMBAHAN: Kolom untuk menyimpan ID dari Genre
        genre_id: {
            type: DataTypes.INTEGER,
        }
    });

    // Mendefinisikan relasi ke tabel Genre
    komik.associate = function(models) {
        // 1 Komik dimiliki oleh (belongsTo) 1 Genre
        komik.belongsTo(models.genre, {
            foreignKey: 'genre_id',
            as: 'genre' // alias untuk pemanggilan (opsional tapi disarankan)
        });
    };

    return komik;
};