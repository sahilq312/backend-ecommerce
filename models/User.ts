import mongoose, { Schema, model } from 'mongoose';

export interface USER {
    name : string,
    email : string,
    password : string,
    role : string,
    address : string
}


const userSchema = new Schema<USER>({
    name: {type: String,required: true},
    email: {type: String ,required: true, unique: true },
    password: {type: String ,required: true},
    role: {type:String, default: "user"},
    address: {type: String}
}
)
const User = model<USER>("user", userSchema);
export default User;