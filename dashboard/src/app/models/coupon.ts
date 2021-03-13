import { couponType } from "./couponType";
import { Orders } from "./orders";
import { Shops } from "./shops";

export interface Coupon {
    name: string,
    inStock: boolean,
    expireDate: Date,
    couponCode:string,
    newPrice:number,
    oldPrice:number,
    description:string,
    pictureName:string,
    published:Date,
    couponType:couponType,
    shop:Shops,
    orders:Orders[]
}
