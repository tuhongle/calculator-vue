<template>
  <div class="calculator-wrapper bg-info vw-100 vh-100 d-flex justify-content-center align-items-center">
    <div class="container-fluid d-flex bg-dark p-4 shadow-lg rounded-4">
        <div class="row h-100">
            <div class="mt-auto" @click="calcStore.trackAction($event)">
                <div class="col mb-4 result">
                    <input type="tel" v-model="finalResult" class="w-100 display-2 border-0 text-end bg-transparent text-white" @click="calcStore.backspace">
                </div>
                <!-- 1st line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="clear">
                        <span v-if="!currentValue">AC</span>
                        <span v-else>C</span>
                    </button>
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="negative">+/-</button>
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="percent">
                        <font-awesome-icon :icon="['fas', 'percent']" />
                    </button>
                    <button class="bg-danger w-100" data-action="divide">
                        <font-awesome-icon icon="fa-solid fa-divide" />
                    </button>
                </div>
                <!-- 2nd line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">7</button>
                    <button class="bg-gray-100 text-white w-100">8</button>
                    <button class="bg-gray-100 text-white w-100">9</button>
                    <button class="bg-danger w-100" data-action="multiply">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <!-- 3rd line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">4</button>
                    <button class="bg-gray-100 text-white w-100">5</button>
                    <button class="bg-gray-100 text-white w-100">6</button>
                    <button class="bg-danger w-100" data-action="subtract">
                        <font-awesome-icon icon="fa-solid fa-minus" />
                    </button>
                </div>
                <!-- 4th line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">1</button>
                    <button class="bg-gray-100 text-white w-100">2</button>
                    <button class="bg-gray-100 text-white w-100">3</button>
                    <button class="bg-danger w-100" data-action="add">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
                <!-- last line -->
                <div class="col d-flex gap-3 justify-content-between">
                    <button class="long rounded-pill bg-gray-100 text-white text-start">0</button>
                    <button class="bg-gray-100 text-white w-100" data-action="decimal">,</button>
                    <button class="bg-danger w-100 equal" data-action="equal">
                        <font-awesome-icon :icon="['fas', 'equals']" />
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCalcStore } from '../stores/calcStore'

const calcStore = useCalcStore();

const { finalResult, currentValue } = storeToRefs(calcStore);

</script>