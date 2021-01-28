const crypto = require('crypto');

const login_enc = (id, pwd, salt) => {
    const shasum = crypto.createHash('sha256');
    shasum.update(id + pwd + salt);

    return shasum.digest('hex');
}

module.exports = {
    login_enc: login_enc,
}