import { Order } from "./orders";
import { Shops } from "./shops";

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    birthday:Date,
    gender: string,
    pictureName:string,
    isAdmin:boolean,
    isSeller:boolean,
    isCustomer:boolean,
    shop:Shops,
    orders:Order[]
}