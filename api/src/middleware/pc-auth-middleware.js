//Instanciando token
const jwt = require('jsonwebtoken');

//Apuração de http request
const { HttpHelper } = require('../utils/http-helper');

function pcAuth(req, res, next) {
    const httpHelper = new HttpHelper(res);

    try {
        const token = req.headers.authorization;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.TOKEN_SECRET,
                (error, pc) => {
                    if (error) {
                        return httpHelper.unauthorized();
                    }
                    req.pc_id = pc.id;
                    next();
                }
            );
        } else {
            return httpHelper.notFound('Token de acesso não foi encontrado!');
        }
    } catch (error) {
        return httpHelper.internalError(error);
    }
}

module.exports = { pcAuth };
