const brandService = require('../services/brands');
const scrapeService = require('../services/scraper');


const getBrands = async (req, res) => {
    const brands = await brandService.getBrands();
    res.json(brands);
};


  const scrape = async (req, res) => {
    scrapeService.scrape();  
    res.send();
  };

  module.exports = {
    getBrands,
    scrape
  };