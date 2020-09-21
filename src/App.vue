<template>
    <v-app>
        <v-form v-model="valid">
            <v-row class="justify-center py-10 indigo lighten-5">
                <v-card width="700">
                    <v-row class="justify-center">
                        <v-col cols="12" md="7">
                            <p class="text-center">Type</p>
                            <v-autocomplete
                                    v-model="typeValue"
                                    :items="getProductTypeNames"
                                    @change="setValue"
                                    dense
                                    outlined
                            ></v-autocomplete>
                            <p class="text-center pt-10">Customer</p>
                            <v-autocomplete
                                    :items="getCustomerNames"
                                    dense
                                    outlined
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>

            <address-input
                    :name-rules="nameRules"
                    @address-deploy="addressDeploy"
            ></address-input>

            <v-row class="justify-center">
                <v-col cols="12" md="4">
                    <p class="text-center pt-10">Product</p>
                    <product-unit
                            v-for="item in productContainer"
                            :key="item.id"
                            :street="item.street"
                            :number="item.number"
                            :productPrice="item.productPrice"
                            :amount="item.amount"
                            class="mb-5"
                            @delete-unit="deleteUnit(item.id)"
                    ></product-unit>
                    <product-input
                            v-if="!switcher"
                            :name-rules="nameRules"
                            :valid="valid"
                            :products="products"
                            :filter-key="filterKey"
                            class="pb-10"
                            @push-change="pushChange"
                    ></product-input>
                    <v-row class="justify-center">
                        <v-btn
                                v-if="switcher"
                                text
                                class="my-12"
                                @click="switcher = !switcher"
                        >
                            Add new item
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="justify-center align-center indigo lighten-5">
                Are you sure to submit this order ?
                <v-checkbox dense class="ml-2"></v-checkbox>
            </v-row>
        </v-form>
    </v-app>
</template>

<script>
    import axios from 'axios';
    import AddressInput from "./components/address-input";
    import ProductInput from "./components/product-input";
    import ProductUnit from "./components/product-unit";

    export default {
        name: 'App',
        components: {AddressInput, ProductInput, ProductUnit},

        data: () => ({
            amount: null,
            address: {},
            customers: [],
            filterKey: null,
            products: [],
            productTypes: [],
            productContainer: [],
            product: {},
            productPrice: null,
            typeValue: null,
            switcher: false,
            valid: false,
            nameRules: [
                v => !!v || 'Field is required',
            ],
        }),
        computed: {
            getProductTypeNames() {
                let productTypeNames = [];

                for (let item of this.productTypes) {
                    productTypeNames.push(item.name);
                }
                return productTypeNames;
            },
            getCustomerNames() {
                let customerNames = [];

                for (let item of this.customers) {
                    customerNames.push(item.name);
                }
                return customerNames;
            },
        },
        methods: {
            setValue() {
                for (let item of this.productTypes) {
                    if (this.typeValue === item.name) {
                        this.filterKey = item.id;
                    }
                }
            },
            pushChange(data) {
                this.product = {...data, ...this.address};
                this.productContainer.push(this.product);
                this.switcher = true;
            },
            addressDeploy(address) {
                this.address = address;
            },
            deleteUnit(id) {
                this.productContainer.splice(id, 1);
            }
        },
        mounted() {
            axios
                .get('https://api-test.cloudareus.com/api/product_types.json')
                .then(response => {
                    for (let item of response.data) {
                        this.productTypes.push(item);
                    }
                });

            axios
                .get('https://api-test.cloudareus.com/api/customers.json')
                .then(response => {
                    for (let item of response.data) {
                        this.customers.push(item);
                    }
                });

            axios
                .get('https://api-test.cloudareus.com/api/products.json')
                .then(response => {
                    for (let item of response.data) {
                        this.products.push(item);
                    }
                })
        },
    };
</script>
