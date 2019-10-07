import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.methods.check = function(password) {
    try {
        // this.username = password
        console.log("do check", password)
    } catch (error) {
        throw new Error("An error happened", error)
    }
}

UserSchema.methods.setPassword = function(password) {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        this.password = hash;

    } catch (ex) {
        throw new Error("An error occured", ex)
    }
}

UserSchema.methods.validatePassword = function(password) {
    console.log("password", password, this.password)
    try {
        return bcrypt.compareSync(password, this.password)
    }catch(ex) {
        throw new Error("Validate Password: An error occured",ex)
    } 
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret')
}

UserSchema.methods.toAuthJSON = function(){
    return {
        _id: this._id,
        email: this.email,
        username: this.username,
        token: this.generateJWT()
    }
}

export const UserModel = mongoose.model('users', UserSchema);