module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'teacher',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
        },
        {
            chareset: 'utf8',
            timestamps: false,
        }
    )
};