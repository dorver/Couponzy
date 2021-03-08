const Brand = require('../models/Brand');

const createBrand = async (place,name, marketCap) => {
    const brand = new Brand({
        place:place,
        name : name,
        marketCap : marketCap
    });

    return await brand.save();
};


const getBrands = async () => {
    return await Brand.find({});
};


module.exports = {
    createBrand,
    getBrands
}