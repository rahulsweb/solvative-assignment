<template>
<div>
    <div class="container">
    <div class="search-box m-2">
        <input id="search" type="text" placeholder="Search"  v-model="searchQuery">
        <button  @click="callApiSearch" type="submit">Search</button>
    </div>
    <table class="table" v-if="itemSort.length"> 
        <thead>
            <tr>
                 <th>#</th>
                <th>Place Name</th>
                <th>Country</th>
            </tr>
        </thead>
        
        <tbody>
            <tr v-for=" (item,index) in  itemSort" :key="index">
                 <td>{{index+1}}</td>
                <td>{{item.city}}</td>

                <td>{{item.country}}</td>

            </tr>
        
        </tbody>
    </table>
        <div class="table" v-else>
       
           
             <h3 class="text-center">  No result found</h3>
        
        </div>
    


   
<h3 v-if="itemSort.length">
<button @click="prevPage">Previous</button> 
<button @click="nextPage">Next</button>
</h3>
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
  limit:5,
  searchQuery:""
        };
    },
    mounted(){
 this.callApi();
    },
computed:{
itemSort(){
     if(this.searchQuery){
      return this.res.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.city.toLowerCase().includes(v) || item.country.toLowerCase().includes(v)) 

      })
      }
return this.res.filter((row, index) => {
		let start = (this.currentPage-1)*this.pageSize;
		let end = this.currentPage*this.pageSize;
		if(index >= start && index < end) return true;
	});
},
  
},

  methods:{
    flagCall(id){
        // https://www.countryflags.io/:file_type/:country_code
    },

     async  callApi(api,data){
  
var axios = require("axios").default;
var data1=[];
    let options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
  params: {countryIds: 'IN', namePrefix: 'del', limit: this.limit},
  headers: {
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
    'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
  }
};


this.res=await this.callGetApi(options);
},
async callGetApi(options){
 let data1= await axios.request(options).then(function (response) {
    let data=response.data.data;
     return  data;
	// this.res=[...];
}).catch(function (error) {
	console.error(error);
});
return data1;
},
async callApiSearch(){

this.res.filter((row, index) => {
		return row.city.includes(this.search) 
	});
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