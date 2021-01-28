module.exports = (sequlize, DataTypes) => {
    return sequlize.define(
        'category',
        {
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            }
        }
    );
}