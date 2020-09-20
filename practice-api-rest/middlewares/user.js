const { getUser } = require('../models/user');

/**
 * Verrify if an user exist
 */
const verifyUserExist = ( req, res, next ) => {
    let userId = req.body.userId;
    let user = getUser(userId);
    if(!user) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `User ${userId} doesn't exist`
            }
        });
    }
    next();
}

module.exports = {
    verifyUserExist
}