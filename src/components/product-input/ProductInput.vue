<template>
    <div>
        <v-autocomplete
                v-model="productValue"
                :items="getProduct"
                :rules="nameRules"
                @change="setPrice"
                dense
                outlined
        ></v-autocomplete>
        <v-row class="justify-center">
            <v-col cols="12" md="4">
                <p class="text-center font-weight-bold">Amount</p>
                <v-text-field
                        v-model="amount"
                        :rules="nameRules"
                        dense
                        outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-btn
                    :disabled="!valid"
                    tile
                    class="subtitle-2 indigo lighten-1 text-white"
                    @click="pushChange"
            >
                Add line to order
            </v-btn>
            <v-btn
                    tile
                    dark
                    class="pink darken-1"
            >
                <v-icon
                        class="subtitle-1"
                >
                    mdi-close
                </v-icon>
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    import './product-input.scss'

    export default {
        name: "ProductInput",
        props: ['products', 'filterKey', 'valid', 'nameRules'],
        data: () => ({
            amount: null,
            productValue: null,
            productPrice: null,
        }),

        computed: {
            getProduct() {
                let productTypes = [];

                for (let item of this.products) {
                    let filterKey = parseInt(item.type.replace(/[^\d.]/g, ''));

                    if (this.filterKey === filterKey) {
                        productTypes.push(item.name);
                    }
                }
                return productTypes;
            },
        },

        methods: {
            pushChange() {
                let data = {
                    amount: this.amount,
                    productPrice: this.productPrice,
                };

                this.$emit('push-change', data)
            },
            setPrice() {
                for (let item of this.products) {
                    if (this.productValue === item.name) {
                        this.productPrice = item.price;
                    }
                }
            },

        }
    }
</script>

<style scoped>

</style>