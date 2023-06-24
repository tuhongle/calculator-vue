<template>
  <input type="text" ref="input" class="text-end" @click="backspace" v-model="result">
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
    name: 'OutputResult',
    directives: {mask},
    props: ['output'],
    data() {
        return {
            result: 0,
        }
    },
    updated() {
        if (Number.isInteger(this.output)) {
            this.result = this.output.toLocaleString();
        } else {
            this.result = this.output;
        }
    },
    methods: {
        backspace() {
            this.$emit("back");
        }
    }
}
</script>
