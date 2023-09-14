//Instanciando token
const jwt = require('jsonwebtoken');

//Apuração de http request
const { HttpHelper } = require('../utils/http-helper');

function pmAuth(req, res, next) {
    const httpHelper = new HttpHelper(res);

    try {
        const token = req.headers.authorization;

        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                process.env.TOKEN_SECRET,
                (error, pm) => {
                    if (error) {
                        return httpHelper.unauthorized();
                    }
                    req.pm_id = pm.id;
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

module.exports = { pmAuth };
