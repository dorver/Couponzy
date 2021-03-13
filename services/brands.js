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
    var mysort = { place: 1 };
    return await Brand.find({}).sort(mysort);
};


module.exports = {
    createBrand,
    getBrands
}