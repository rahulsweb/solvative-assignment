<template>
<div>
    <div class="container">
        <div v-if="error" class="error">
            {{error}}
            <button @click="redirectBack" type="submit">Back</button>
        </div>

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

                        <td class="flex">{{item.country}}<img :src="`https://flagsapi.com/${item.countryCode}/shiny/64.png`" width="20" class="ml-2">

</td>

                    </tr>

                </tbody>
            </table>
            <div class="table" v-else>

                <h3 class="text-center"> No result found</h3>

            </div>

            <div v-if="itemSort.length">
                <button class="m-2 " @click="prevPage">Previous</button>
                <button class="m-2 " @click="nextPage">Next</button>
            </div>
            <div class="user-input m-2">
                <label for="number">Number of cities to show
                    <input id="number" type="number" min="1" max="10" v-model="limit" @input="callApiInput">

                </label>
            </div>
            <div v-if="limit < 1 || limit > 10 " class="error mt-2">Enter the number between 1 to 10 </div>

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
            limit: 3,
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
        this.pageSize = this.limit;
    },

    methods: {
        redirectBack() {
            location.reload();
        },
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
                this.show = false;

            }

            this.show = false;
        },

        async callApiSearch() {
            if (!this.searchQuery)
                return this.res;
            this.res.filter((row, index) => {
                return row.city.includes(this.search)
            });
        },
        async callApiInput() {

            if (this.limit >= 1 && this.limit <= 10) {
                this.show = true;
                await this.callApi();
                this.show = false;
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
