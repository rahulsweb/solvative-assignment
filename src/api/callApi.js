import axios from 'axios';
let options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
    }

  };
export async function callGetApi(url,param){
    options.url= url;
    options.params= param;
    return await axios.request(options).then(function (response) {
    return response.data.data;
   }).catch(function (error) {
    console.log(error);
    return false;
   });

   }