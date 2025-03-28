import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    foto: String,
    rol: String,
    tipostd: String,
    dateb: String,
    datee: String,
    celular: String,
    logindate: String,
    carrera: String,
    mencion: String,
    ciclo: String,
    sexo: String,
    dni: String,
    password: String,
    name: String,
    email: String,
    filosophy: String,
},{
    timestamps: true,
    collation: { locale: 'es' }
});

export interface IUser extends Document {
    foto: string;
    rol: string;
    tipostd: string;
    dateb: string,
    datee: string,
    celular: string,
    logindate: string,
    carrera: string,
    mencion: string,
    ciclo: string,
    sexo: string,
    dni: string,
    password: string;
    name: string;
    email: string;
    filosophy: string
}

export default model<IUser>('User', schema);
