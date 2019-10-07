import { UserModel } from '../schema/users';

export const createUser = async (req, res, next) => {
    let { username, email, password } = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "Either the username, password or email should not be empty"
        })
    } else {
        if (await userNameExist(username) === true || await emailAddressExist(email) === true) {
            return res.status(409).json({
                error: true,
                success: false,
                message: `Username or email address already exist`
            })
        } else {
            let userInfo = {
                username: username,
                email: email,
                password: password
            }

            UserModel.create(userInfo)
            .then((user) => {
                if(user) {
                    user.setPassword(user.password)
                    user.save().then((updatedUser) => {
                        return res.status(201).json({
                            error: false,
                            success: true,
                            data: updatedUser
                        })
                    })
                }
            }).catch((error) => {
                return res.status(400).json({
                    error: true,
                    success: false,
                    message: "Unexpected error "+ error.message
                })
            })
        }
    }
  
}

export const auth = async (req, res, next) => {

    let { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json({
            error: true,
            success: false,
            message: "both email and password are required"
        })
    }

    try {
        let user = await UserModel.findOne({ email: email })
        if(user && user.validatePassword(password) === true ) {
            console.log("true")
            return res.status(200).json({
                error: false,
                success: true,
                user: user.toAuthJSON()
            })
        } else {
            return res.status(400).json({
                error: true,
                success: false,
                message: "either email or password is incorrect"
            })
        }
    } catch (ex) {
        return res.status(400).json({
            error: true,
            success: false,
            message: ex
        })
    }
}

const userNameExist = async (username) => {
    let findUserName =  await UserModel.find({ username: username})
    if(findUserName.length > 0) {
        return true
    } else {
        return false;
    }
}

const emailAddressExist = async (email) => {
    let findEmailAddress = await UserModel.find({ email: email })
    if(findEmailAddress.length > 0) {
        return true
    } else {
        return false
    }
}