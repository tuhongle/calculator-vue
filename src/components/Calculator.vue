<template>
    <div class="calculator-wrapper">
      <div class="container border border-3 border-dark shadow-lg">
          <div class="row bg-light result">
              <OutputResult :output="finalResult" @back="backspace"/>
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
  import OutputResult from './Output.vue'
  
  export default {
      name: "Calculator",
      components: {OutputResult},
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
              isEqual: false,
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
              this.$refs.divide.classList.replace("bg-light", "bg-success");
              this.$refs.divide.classList.remove("text-success");
              this.$refs.multi.classList.replace("bg-light", "bg-success");
              this.$refs.multi.classList.remove("text-success");
              this.$refs.minus.classList.replace("bg-light", "bg-success");
              this.$refs.minus.classList.remove("text-success");
              this.$refs.plus.classList.replace("bg-light", "bg-success");
              this.$refs.plus.classList.remove("text-success");
          },
          toggle(el) {
              el.target.classList.toggle("bg-success");
              el.target.classList.toggle("bg-light");
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
              if (this.isEqual) {
                this.input = [];
              };
              this.isNum = true;
              this.isFunc = false;
              this.isPriorFunc = false;
              this.isEqual = false;
              if (this.isNum) {
                  this.result.push(num);
                  this.isNum = false;
                  if (this.result[0] === 0 && this.input.length <= 1) {
                    this.result.shift();
                    this.finalResult = 0;
                    console.log('1', this.result, this.finalResult);
                  } else if (this.result[0] === '.') {
                    this.result.unshift(0);
                    this.finalResult = this.result.join('');
                    this.tempInput = +this.result.join('');
                    console.log('2', this.result, this.finalResult);
                  } else {
                    this.tempInput = +this.result.join('');
                    this.finalResult = this.tempInput;
                    console.log('3', this.result, this.finalResult);
                  }       
              };
              console.log(this.tempInput);
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
              if (this.input[this.input.length - 1] === '+' && (this.tempInput === null)) {
                  this.finalResult *= 2;
                } else if (this.input[this.input.length - 1] === '-' && (this.tempInput === null)) {
                    this.finalResult = 0;
                } else if (this.input[this.input.length - 1] === '*' && (this.tempInput === null)) {
                    this.finalResult = Math.pow(this.finalResult, 2);
                } else if (this.input[this.input.length - 1] === '/') {
                    if (this.tempInput === null) {
                        this.finalResult = 1;
                    } else if (this.tempInput === 0) {
                        this.finalResult = "ERROR";
                    }
                } else {
                    this.input.push(this.tempInput);
                    this.finalResult = Function("return " + (this.input.join(' ')))();
                };
              this.result= [];
              this.reset();
              if (typeof this.finalResult === 'number') {         
                  this.input = [this.finalResult];
                  this.notInteger();
              } else {
                this.input = [];
              }
              this.isFunc = false;
              this.isEqual = true;
              this.tempInput = null;
              console.log(this.input);
              console.log("priorInput:", this.priorInput);
          },
      },
  }
  </script>