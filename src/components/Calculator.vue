<template>
  <div class="calculator-wrapper">
    <div class="container border border-3 border-dark shadow-lg">
        <div class="row bg-light result">
            <input type="tel" v-model="finalResult" class="text-end" v-mask="'XXX.XXX.XXX'" @click="backspace">
        </div>
        <div class="row">
            <div class="col-3 p-0" @click="clearResult">
                <button class="w-100 h-100 border border-1 border-dark bg-secondary">
                    <span v-if="!finalResult">AC</span>
                    <span v-else>C</span>
                </button>
            </div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary">+/-</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary">%</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-success" @click="divide($event)" ref="divide">/</button></div>
        </div>
        <div class="row">
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(7)">7</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(8)">8</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(9)">9</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-success" @click="multi($event)" ref="multi">x</button></div>
        </div>
        <div class="row">
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(4)">4</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(5)">5</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(6)">6</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-success" @click="minus($event)" ref="minus">-</button></div>
        </div>
        <div class="row">
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(1)">1</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(2)">2</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(3)">3</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-success" @click="plus($event)" ref="plus">+</button></div>
        </div>
        <div class="row">
            <div class="col-6 p-0"><button class="w-100 h-100 border border-1 border-dark bg-gray-100" @click="addNum(0)">0</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary">,</button></div>
            <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-success equal" @click="equal" ref="equal">=</button></div>
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
            priorInput: [],
            finalResult : 0,
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
        backspace() {
            this.result.pop();
            this.tempInput = +this.result.join('');
            this.finalResult = this.tempInput;
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
            } else {
                this.finalResult = eval(this.input.join(' '));
                this.input.push(this.isPlus[1]);
            };
            this.isPlus[0] = true;
        },
        minus(el) {
            this.doFunc(el);
            if (!(this.isPlus[0] || this.isMinus[0] || this.isMulti[0] || this.isDivide[0])) {
                this.input.push(this.isMinus[1]);
            } else {
                this.finalResult = eval(this.input.join(' '));
                this.input.push(this.isMinus[1]);
            };
            this.isMinus[0] = true;
        },
        multi(el) {
            console.log(this.tempInput);
            this.priorInput.push(this.tempInput);
            this.doFunc(el);
            if (!(this.isPlus[0] || this.isMinus[0] || this.isMulti[0] || this.isDivide[0])) {
                this.input.push(this.isMulti[1]);
            } else {
                this.finalResult = eval(this.priorInput.join(' '));
                this.input.push(this.isMulti[1]);
            };
            this.isMulti[0] = true;
        },
        divide(el) {
            this.priorInput.push(this.tempInput);
            this.doFunc(el);
            if (!(this.isPlus[0] || this.isMinus[0] || this.isMulti[0] || this.isDivide[0])) {
                this.input.push(this.isDivide[1]);
            } else {
                this.finalResult = eval(this.priorInput.join(' '));
                this.input.push(this.isDivide[1]);
            };
            this.isDivide[0] = true;
        },
        equal() {
            this.input.push(this.tempInput);
            this.finalResult = eval(this.input.join(' '));
            this.result= [];
            this.reset();
            this.input = [];
            this.resetIsNum();
            this.tempInput = null;
        },
    },
}
</script>