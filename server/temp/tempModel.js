const sequelize = require('./models').sequelize;

const {
    Teacher,
    Sequelize: { Op }
} = require('./models');


module.exports = {
    api : {
        getData: callback => {
            Teacher.findAll()
            .then(result => { callback(result) })
            .catch(err => {throw err})
        },
        addData: (req, callback) => {
            Teacher.create({
                name: req.body.data
            })
            .then( result => {
                callback(result)
            })
            .catch(err => { throw err; })
        },
        modifyData: (req, callback) => {
            Teacher.update({name : req.body.modify.name}, {
                where: {id: req.body.modify.id}
            })
            .then(result => {callback(result)})
            .catch(err => {throw err})
        },
        deleteData: (req, callback) => {
            Teacher.destroy({
                where: {id: req.body.delete.id}
            })
            .then(callback(200))
            .catch(err => {throw err})
        }
    }
}