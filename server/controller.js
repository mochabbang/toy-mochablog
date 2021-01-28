const path = require('path');
const model = require('./model');

const salt = require(path.join(__dirname, 'config', 'config.json')).salt;
const hashing = require(path.join(__dirname, 'config', 'hashing.js'));

module.exports = {
    api: {
        sendPw: (req, res) => {
            const body = req.body.state;
            const hash = hashing.login_enc(body.id, body.password, salt);

            model.api.searchInfo(body, hash, result => {
                var obj = {};                

                if(result[0]) {
                    obj['rlt'] = true;
                    obj['msg'] = '로그인 성공'
                }
                else
                {
                    obj['rlt'] = false;
                    obj['msg'] = '로그인 실패'
                }

                res.send(obj);
            });

            console.log('1. slat 합한 값 : ', body.id, body.password, salt);
            console.log('2. salt 값 : ', salt);
            console.log('3. hash결과 : ', hash);
        },
    },
    add: {
        board: (req, res) => {
            const body = req.body.data;
            
            model.add.board(body, result => {
                if(result) {
                    res.send(true);
                }
            })
        },
        category: (req, res) => {
            const body = req.body.data;

            model.add.category(body, result => {
                var obj = {};
                obj.suc = result ? true : false;
                obj.msg = result ? '카테고리가 생성되었습니다.' : '이미 있는 카테고리 입니다.';

                res.send(obj);
            })
        },
    },
    get: {
        board: (req, res) => {
            const param = req.body.data;

            model.get.board(param, result => {
                if  (result) {
                    res.send(result);
                }
            })
        },
        board_cnt: (req, res) => {
            const param = req.body.data;
            model.get.board_cnt(param, cnt => {
                const result = { cnt: cnt }
                res.send(result);
            })
        },
        board_data: (req, res) => {
            const param = req.body.data;
            model.get.board_data(param, data => {
                res.send(data)
            })
        },
        category: (req, res) => {
            model.get.category(data => {
                res.send(data);
            })
        },
    },
    update: {
        view_cnt: (req, res) => {
            const param = req.body.data;

            const expires = new Date()
            expires.setDate(expires.getDate() + 1);

            const cookie_name = 'board_' + param.id;
            
            if(!req.cookies[cookie_name]) {
                res.cookie(cookie_name, true, {
                    expires: expires
                });

                model.update.view_cnt(param, result => {
                    if (result) {
                        res.send(true);
                    }
                });
            }
        },
        category: (req, res) => {
            const param = req.body.data;

            model.update.category(param, result => {
               var obj = {};
               
               obj.suc = result ? true : false;
               obj.msg = result ? '카테고리가 변경되었습니다.' : '이미 있는 카테고리 입니다.';

               res.send(obj);
            });
        }
    },
    delete: {
        category: (req, res) => {
            const param = req.body.data;

            model.delete.category(param, result => {
                res.send(result);
            });
        }
    }
}