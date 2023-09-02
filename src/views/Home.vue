<template>
<div>
    <div class="container">
        <div v-if="error" class="error">{{error}}</div>

        <div v-if="show" class="custom-loader">
        </div>
        <div v-else>
            <div class="search-box m-2">
                <input id="search" type="text" :placeholder="'Start searching...'" v-model="searchQuery">
                <button @click="callApiSearch" type="submit">Search</button>
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

                <h3 class="text-center"> No result found</h3>

            </div>

            <h3 v-if="itemSort.length">
                <button @click="prevPage">Previous</button>
                <button @click="nextPage">Next</button>
            </h3>
            <div class="user-input">
                <input type="number" min="5" max="10" v-model="limit" @input="callApiInput">
                <label for="user-input">Number of cities to show</label>
            </div>
            <div v-if="limit < 5 || limit > 10 " class="error mt-2">Enter the number between 5 to 10 </div>

        </div>

    </div>
</div>
</template>

<script>
/* eslint-disable */
import {
    callGetApi
} from '@/api/callApi.js';
export default {
    name: 'Home',

    data() {
        return {
            show: false,
            error: "",
            res: [],
            pageSize: 3,
            currentPage: 1,
            limit: 5,
            searchQuery: ""
        };
    },

    computed: {
        itemSort() {
            this.show = true;
            if (this.searchQuery) {
                return this.res.filter((item) => {
                    this.show = false;
                    return this.searchQuery.toLowerCase().split(' ').every(v => item.city.toLowerCase().includes(v) || item.country.toLowerCase().includes(v))

                })
            }
            return this.res.filter((row, index) => {
                this.show = false;
                let start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize;
                if (index >= start && index < end) return true;
            });
        },

    },

    mounted() {
        this.callApi();
    },

    methods: {
        flagCall(id) {
            // https://www.countryflags.io/:file_type/:country_code
        },

        async callApi(api, data) {
            let url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
            let param = {
                countryIds: 'IN',
                namePrefix: 'del',
                limit: this.limit
            };
            this.res = await callGetApi(url, param);
            if (!this.res) {
                this.error = "Something went wrong....";
                location.reload();
            }

            this.show = false;
        },

        async callApiSearch() {

            this.res.filter((row, index) => {
                return row.city.includes(this.search)
            });
        },
        async callApiInput() {

            if (this.limit >= 5 && this.limit <= 10) {
                this.show = true;
                await this.callApi();
            }

            this.show = false;

        },
        nextPage: function () {
            this.show = true;
            if ((this.currentPage * this.pageSize) < this.res.length) this.currentPage++;
            this.show = false;

        },
        prevPage: function () {
            this.show = true;
            if (this.currentPage > 1) this.currentPage--;
            this.show = false;
        }
    }
};
</script>

<style>
@import '@/assets/css/users.css';
</style>
