<template>
  <div class="calculator-wrapper">
    <div class="container border border-3 border-dark shadow-lg">
        <div class="row border border-1 border-dark bg-light result">
            <input type="tel" v-model="finalResult" class="text-end" disabled v-mask="'XXX.XXX.XXX'">
        </div>
        <div class="row">
            <div class="col-3 border border-1 border-dark bg-secondary" @click="clearResult">
                <span v-if="!finalResult">AC</span>
                <span v-else>C</span>
            </div>
            <div class="col-3 border border-1 border-dark bg-secondary">+/-</div>
            <div class="col-3 border border-1 border-dark bg-secondary">%</div>
            <div class="col-3 border border-1 border-dark bg-success" @click="divide($event)" ref="divide">/</div>
        </div>
        <div class="row">
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(7)">7</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(8)">8</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(9)">9</div>
            <div class="col-3 border border-1 border-dark bg-success" @click="multi($event)" ref="multi">x</div>
        </div>
        <div class="row">
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(4)">4</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(5)">5</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(6)">6</div>
            <div class="col-3 border border-1 border-dark bg-success" @click="minus($event)" ref="minus">-</div>
        </div>
        <div class="row">
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(1)">1</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(2)">2</div>
            <div class="col-3 border border-1 border-dark bg-gray-100" @click="addNum(3)">3</div>
            <div class="col-3 border border-1 border-dark bg-success" @click="plus($event)" ref="plus">+</div>
        </div>
        <div class="row">
            <div class="col-6 border border-1 border-dark bg-gray-100"  @click="addNum(0)">0</div>
            <div class="col-3 border border-1 border-dark bg-secondary">,</div>
            <div class="col-3 border border-1 border-dark bg-success" @click="equal($event)" ref="equal">=</div>
        </div>
    </div>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'

export default {
    name: "Calculator",
    directives: {mask},
    data() {
        return {
            result : [],
            input: [],
            finalResult : 0,
            isNum: false,
            isPlus: [false, '+'],
            isMinus: [false, '-'],
            isMulti: [false, '*'],
            isDivide: [false, '/'],
            tempInput: null,
        }
    },
    methods: {
        clearResult() {
            this.finalResult = 0;
            this.result= [];
            this.reset();
            this.input = [];
            this.resetIsNum();
        },
        reset() {
            this.$refs.divide.classList.replace("bg-secondary", "bg-success");
            this.$refs.divide.classList.remove("text-success");
            this.$refs.multi.classList.replace("bg-secondary", "bg-success");
            this.$refs.multi.classList.remove("text-success");
            this.$refs.minus.classList.replace("bg-secondary", "bg-success");
            this.$refs.minus.classList.remove("text-success");
            this.$refs.plus.classList.replace("bg-secondary", "bg-success");
            this.$refs.plus.classList.remove("text-success");
            this.$refs.equal.classList.replace("bg-secondary", "bg-success");
            this.$refs.equal.classList.remove("text-success");
        },
        resetIsNum() {
            this.isPlus[0] = false;
            this.isMinus[0] = false;
            this.isMulti[0] = false;
            this.isDivide[0] = false;
        },
        toggle(el) {
            el.target.classList.toggle("bg-success");
            el.target.classList.toggle("bg-secondary");
            el.target.classList.toggle("text-success");
        },
        addNum(num) {
            this.isNum = true;
            if (this.isNum) {
                this.result.push(num);
                this.isNum = false;
                if (this.result[0] === 0) {
                    this.result.shift();
                    this.finalResult = 0;
                } else {
                    this.tempInput = +this.result.join('');
                    this.finalResult = this.tempInput;
                }       
            };
        },
        doFunc(el) {
            this.reset();
            this.toggle(el);
            this.input.push(this.tempInput);
            this.tempInput = null;
            this.result = [];
        },
        plus(el) {
            this.doFunc(el);
            if (!(this.isPlus[0] || this.isMinus[0] || this.isMulti[0] || this.isDivide[0])) {
                this.input.push(this.isPlus[1]);
                this.isPlus[0] = true;
            } else {
                this.finalResult = eval(this.input.join(' '));
                this.input.push(this.isPlus[1]);
                // this.resetIsNum();
                this.isPlus[0] = true;
            };
        },
        minus(el) {
            this.doFunc(el);
            if (!(this.isPlus[0] || this.isMinus[0] || this.isMulti[0] || this.isDivide[0])) {
                this.input.push(this.isMinus[1]);
                this.isMinus[0] = true;
            } else {
                this.finalResult = eval(this.input.join(' '));
                this.input.push(this.isMinus[1]);
                // this.resetIsNum();
                this.isMinus[0] = true;
                console.log(this.input)
            };
        },
    },
}
</script>