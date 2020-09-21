<template>
    <div>
        <v-row class="justify-center indigo lighten-4">
            <v-btn
                    block
                    text
                    class="subtitle-2 font-weight-regular"
                    @click="drawer = !drawer"
            >
                Add Address
            </v-btn>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="4">
        <v-list
                v-show="drawer"
        >
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Address Name</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">City</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Street</p>
                    <v-text-field
                            v-model="address.street"
                            dense
                            outlined
                            required
                            :rules="nameRules"
                            @change="deployAddress"
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Number</p>
                    <v-text-field
                            v-model="address.number"
                            dense
                            outlined
                            required
                            :rules="nameRules"
                            @change="deployAddress"
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Apartment</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Floor</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Phone</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
            <v-list-item>
                <v-col cols="12" md="12">
                    <p class="text-center">Phone 2</p>
                    <v-text-field
                            dense
                            outlined
                            required
                    ></v-text-field>
                </v-col>
            </v-list-item>
        </v-list>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "AddressLayout",
        props: ['nameRules'],
        data: () => ({
            drawer: false,
            address: {
                street: null,
                number: null,
            },
        }),
        methods: {
            deployAddress() {
                this.$emit('address-deploy', this.address)
            }
        }
    }
</script>

<style scoped>

</style>