import { Branches } from "./branches";
import { Coupon } from "./coupon";
import { User } from "./users";

export interface Order {
    orderDate: Date,
    coupon: Coupon,
    branch: Branches,
    user:User
}
