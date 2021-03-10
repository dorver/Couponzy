let axios = require('axios');
let cheerio = require('cheerio');
const brandService = require('../services/brands');

const scrape = async () => {
    const page = await axios.get('https://fashionunited.com/i/top200/')    
    const $ = cheerio.load(page.data); 
    var j=0;   
    $('tr').each(function () {
        if(j!=0){
        var i=0;
        var name,marketCap,place;
        $('td', this).each(function(){
            const row = $(this);
            if(i==1){
                place=row.text();
            }
            if(i==2){
                name = row.text();
            }
            else if(i==3){
                marketCap=row.text();
            }
            i++;
        });    
        brandService.createBrand(place, name, marketCap);  

    }          
    j++;
    });
};

module.exports = {
    scrape
};