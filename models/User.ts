import mongoose, { Schema, model } from 'mongoose';

export interface USER {
    name : string,
    email : string,
    password : string
}


const userSchema = new Schema<USER>({
    name: {type: String,required: true},
    email: {type: String ,required: true, unique: true },
    password: {type: String ,required: true}
}
)
const User = model<USER>("user", userSchema);
export default User;