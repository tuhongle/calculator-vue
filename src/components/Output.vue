<template>
  <input type="text" ref="input" class="text-end" @click="backspace" v-model="result">
</template>

<script>

export default {
    name: 'OutputResult',
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
