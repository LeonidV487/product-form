<template>
    <v-row class="justify-center">
        <v-btn
                tile
                dark
                class="subtitle-2 indigo lighten-1"
        >
            Price {{productPrice}}
        </v-btn>
        <v-btn
                tile
                dark
                class="subtitle-2 indigo lighten-1"
        >
            Amount {{amount}}
        </v-btn>
        <v-btn
                tile
                dark
                class="subtitle-2 indigo lighten-1"
        >
            {{number + ' ' + street}}
        </v-btn>
        <v-btn
                tile
                dark
                class="pink darken-1"
                @click="deleteUnit"
        >
            <v-icon
                    class="subtitle-1"
            >
                mdi-close
            </v-icon>
        </v-btn>
    </v-row>
</template>

<script>
    export default {
        name: "ProductUnit",
        props: ['address', 'productPrice', 'amount', 'number', 'street'],
        methods: {
            deleteUnit(){
                this.$emit('delete-unit');
            }

        }
    }
</script>

<style scoped>

</style>