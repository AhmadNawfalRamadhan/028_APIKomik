module.exports = (sequelize, DataTypes) => {
    const genre = sequelize.define('genre', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nama_genre: {
            type: DataTypes.STRING,
        }
    });

    // Mendefinisikan relasi ke tabel Komik
    genre.associate = function(models) {
        // 1 Genre bisa memiliki banyak (hasMany) Komik
        genre.hasMany(models.komik, {
            foreignKey: 'genre_id',
            as: 'komiks' // alias untuk pemanggilan (opsional tapi disarankan)
        });
    };

    return genre;
};