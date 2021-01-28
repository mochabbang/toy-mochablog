const sequelize = require('./models').sequelize;

const {
    Admin,
    Board,
    Category,
    Sequelize: { Op },    
} = require('./models');

module.exports = {
    api : {
        searchInfo: (body, hash, callback) => {
            Admin.findAll({
                where: { [Op.and]: [{ user_id: body.id, password: hash}]}
            })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            });
        }
    },
    add : {
        board: (body, callback) => {
            Board.create({
                title: body.title,
                contents: body.content,
                date: new Date(),
                view_cnt: 0,
                cat_id: 0,
            })
            .then(() => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        },
        category: (body, callback) => {
            Category.count({
                where: { name: body.name }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                }
                else {
                    Category.create({
                        name: body.name
                    })
                    .then(() => { callback(true) })
                }
            })
        }
    },
    get : {
        board: (param, callback) => {

            let search = (param.search) ? ('%'+ param.search +'%') : '%%';

            Board.findAll({
                where: {
                    title: {
                        [Op.like]: search
                    },
                    contents: {
                        [Op.like]: search,
                    },
                    cat_id: param.category,
                },
                order: [['board_id','DESC']],
                limit: (param.page * param.limit),
                offset: (param.page - 1) * param.limit,
                
            }).then(
                data => {
                    callback(data)
                }
            )
            .catch(err => {
                throw err;
            })
        },
        board_cnt: (param, callback) => {
            let search = (param.search) ? ('%'+ param.search +'%') : '%%';

            Board.count({
                where: {
                    title: {
                        [Op.like]: search
                    },
                    contents: {
                        [Op.like]: search,
                    },
                    cat_id: param.category,
                }
            }).then(
                result => {
                    callback(result);
                }
            )
            .catch(
                err => { throw err; }
            )
        },
        board_data: (param, callback) => {
            Board.findAll({
                where: {
                    board_id: param.id
                }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },
        category: (callback) => {
            Category.findAll()
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },
    },
    update: {
        view_cnt: (param, callback) => {
            Board.update({
                view_cnt: sequelize.literal('view_cnt + 1')
            }, {
                where: { board_id : param.id }
            })
            .then(() => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        },
        category: (param, callback) => {
            Category.count({
                where: {name: param.name}
            })
            .then(cnt => {
                if(cnt> 0) {
                    callback(false);
                }
                else {
                    Category.update({
                        name: param.name
                    }, {
                        where: { id : param.id } 
                    })
                    .then(() => callback(true))
                    .catch(err => { throw err; })
                }
            })
            .catch(err => {
                throw err;
            });
        }
    },
    delete: {
        category: (param, callback) => {
            Category.destroy({
                where: {id: param.id}
            })
            .then(() => {
                Board.update({cat_id: 0}, {
                    where: { cat_id: param.id }
                })
                .then(() => {callback(true)})
                .catch(err => {throw err;})
            })
            .catch(err => { throw err; })
        }
    }
}