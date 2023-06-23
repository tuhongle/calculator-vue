<template>
    <div class="calculator-wrapper">
      <div class="container border border-3 border-dark shadow-lg">
          <div class="row bg-light result">
              <input type="number" v-model="finalResult" class="text-end" @click="backspace">
          </div>
          <div class="row">
              <div class="col-3 p-0" @click="clearResult">
                  <button class="w-100 h-100 border border-1 border-dark bg-secondary">
                      <span v-if="!finalResult">AC</span>
                      <span v-else>C</span>
                  </button>
              </div>
              <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary" @click="toggleNegPos">+/-</button></div>
              <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary" @click="percent">%</button></div>
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
              <div class="col-3 p-0"><button class="w-100 h-100 border border-1 border-dark bg-secondary" @click="addNum('.')">,</button></div>
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
              isNum: false,
              isPriorFunc: false,
              isFunc: false,
              isPlus: '+',
              isMinus: '-',
              isMulti: '*',
              isDivide: '/',
              tempInput: null,
          }
      },
      methods: {
          clearResult() {
              this.finalResult = 0;
              this.result= [];
              this.reset();
              this.input = [];
              this.isFunc = false;
              this.priorInput = [];
          },
          notInteger() {
            if (!Number.isInteger(this.finalResult) &&  this.finalResult) {
                let x = Math.floor(this.finalResult);
                this.finalResult = +this.finalResult.toFixed(9 - x.toString().length);
            }
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
          toggleNegPos() {
            this.finalResult = -this.finalResult;
            this.tempInput = this.finalResult;
          },
          percent() {
            this.finalResult = this.finalResult/100;
            this.tempInput = this.finalResult;
          },
          addNum(num) {
              if (!this.isPriorFunc) {
                this.priorInput = [];
              };
              this.isNum = true;
              this.isFunc = false;
              this.isPriorFunc = false;
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
              this.isFunc = true;
          },
          plus(el) {
              if (this.isFunc) {
                  this.input.pop();
              };
              if (this.tempInput !== null || (!this.isFunc)) {
                this.doFunc(el);
              } else {
                this.reset();
                this.toggle(el);
              };
              if (!(this.isFunc || this.isPriorFunc)) {
                  this.input.push(this.isPlus);
              } else {
                  this.finalResult = Function("return " + (this.input.join(' ')))();
                  this.input.push(this.isPlus);
              };
              console.log(this.input);
              this.isFunc = true;
              this.notInteger();
          },
          minus(el) {
              if (this.isFunc) {
                  this.input.pop();
              };
              if (this.tempInput !== null || (!this.isFunc)) {
                this.doFunc(el);
              } else {
                this.reset();
                this.toggle(el);
              };
              if (!(this.isFunc || this.isPriorFunc)) {
                  this.input.push(this.isMinus);
              } else {
                  this.finalResult = Function("return " + (this.input.join(' ')))();
                  this.input.push(this.isMinus);
              };
              this.isFunc = true;
              this.notInteger();
          },
          multi(el) {
            console.log("multi", this.priorInput); // test
              if (this.isFunc) {
                  this.input.pop();
                  this.tempInput = +this.input[this.input.length - 1];
                  this.input.pop();
              };
              if (this.isPriorFunc) {
                this.priorInput.pop();
                this.priorInput.pop();
              };
              this.priorInput.push(this.tempInput);
              console.log("multi", this.priorInput); // test
              this.doFunc(el);
              if (!(this.isFunc || this.isPriorFunc)) {
                  this.input.push(this.isMulti);
                  this.priorInput.push(this.isMulti);
              } else {
                  this.finalResult = Function("return " + (this.priorInput.join(' ')))();
                  this.input.push(this.isMulti);
                  this.priorInput.push(this.isMulti);
              };
              this.isPriorFunc = true;
              this.notInteger();
              console.log(this.isPriorFunc);
              console.log("input:", this.input);
              console.log("priorInput:", this.priorInput);
          },
          divide(el) {
              if (this.isFunc) {
                  this.input.pop();
                  this.tempInput = +this.input[this.input.length - 1];
                  this.input.pop();
              };
              if (this.isPriorFunc) {
                this.priorInput.pop();
                this.priorInput.pop();
              };
              this.priorInput.push(this.tempInput);
              this.doFunc(el);
              if (!(this.isFunc || this.isPriorFunc)) {
                  this.input.push(this.isDivide);
                  this.priorInput.push(this.isDivide);
              } else {  
                  this.finalResult = Function("return " + (this.priorInput.join(' ')))();
                  this.input.push(this.isDivide);
                  this.priorInput.push(this.isDivide);
              };
              this.isPriorFunc = true;
              this.notInteger();
              console.log("input:", this.input);
              console.log("priorInput:", this.priorInput);
          },
          equal() {
              this.input.push(this.tempInput);
              if (this.input[this.input.length - 2] === '+') {
                this.finalResult *= 2;
              } else if (this.input[this.input.length - 2] === '-') {
                this.finalResult = 0;
              } else if (this.input[this.input.length - 2] === '*') {
                this.finalResult = Math.pow(this.finalResult, 2);
              } else if (this.input[this.input.length - 2] === '/') {
                this.finalResult = 1;
              } else {
                    this.finalResult = Function("return " + (this.input.join(' ')))();
              };
              this.result= [];
              this.reset();
              this.input = [this.finalResult];
              this.isFunc = false;
              this.tempInput = null;
              this.notInteger();
              console.log(this.input);
          },
      },
  }
  </script>