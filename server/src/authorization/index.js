import jwt from 'express-jwt';

const getTokenFromHeaders = (req, res) => {
    const { headers: { authorization } } = req;
    console.log("check req", req.user)

    if ( authorization && authorization.split(' ')[0] === 'Bearer') {
        console.log("auth token", authorization.split(' ')[1])
        return authorization.split(' ')[1]
    }
    return null;
}

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
}

export default auth;