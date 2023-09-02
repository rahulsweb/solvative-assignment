<template>
<div>
    <div class="container">
    <div class="search-box m-2">
        <input id="search" type="text" placeholder="Search" >
        <button  @click="callApiInput" type="submit">Search</button>
    </div>
    <table class="table">
        <thead>
            <tr>
                 <th>#</th>
                <th>City</th>
                <th>Population</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=" (item,index) in itemSort" :key="index">
                 <td>{{index+1}}</td>
                <td>{{item.city}}</td>

                <td>{{item.population}}</td>
            </tr>
        
        </tbody>
    </table>
<p>
<button @click="prevPage">Previous</button> 
<button @click="nextPage">Next</button>
</p>
    <div class="user-input">
        <input type="number" min="5" max="10" v-model="limit" @input="callApiInput">
        <label for="user-input">Number of cities to show</label>
    </div>
   </div>
</div>
</template>

<script>
/* eslint-disable */

import axios from 'axios';

export default {
    name: 'Home',

    data() {
        return {
            
  res:[],
    pageSize:3,
  currentPage:1,
  limit:5
        };
    },
    mounted(){
 this.callApi();
    },
computed:{
itemSort(){
return this.res.filter((row, index) => {
		let start = (this.currentPage-1)*this.pageSize;
		let end = this.currentPage*this.pageSize;
		if(index >= start && index < end) return true;
	});
}
},

  methods:{
     async  callApi(api,data){
  
var axios = require("axios").default;
var data1=[];
var options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  params: {countryIds: 'IN', namePrefix: 'del', limit: this.limit},
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
  }
};

  await axios.request(options).then(function (response) {
    let data=response.data.data;
      data1=data;
	// this.res=[...];
}).catch(function (error) {
	console.error(error);
});
this.res=data1;
},
async callApiInput(){
    await this.callApi();
},
nextPage:function() {
  if((this.currentPage * this.pageSize) < this.res.length) this.currentPage++;
},
prevPage:function() {
  if(this.currentPage > 1) this.currentPage--;
}
  }
};
</script>

<style  >
  @import '@/assets/css/users.css';

</style>