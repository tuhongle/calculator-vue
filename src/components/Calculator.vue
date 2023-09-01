<template>
  <div class="calculator-wrapper bg-info d-flex justify-content-center align-items-center">
    <div class="container-fluid d-flex p-4 vh-100 vw-100 shadow-lg">
        <div class="row h-100">
            <div class="mt-auto" @click="calcStore.trackAction($event)">
                <div class="col mb-4" id="result">
                    <input v-if="isFinalResult" type="text" v-model="finalInput" class="w-100 display-2 border-0 text-end bg-transparent text-white">
                    <input v-else type="text" v-model="currentInput" id="valueInput" class="w-100 display-2 border-0 text-end bg-transparent text-white">
                </div>
                <!-- 1st line -->                           
                <div class="col d-flex gap-2 justify-content-between mb-2">
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="clear">
                        <span v-if="currentInput === '0'">AC</span>
                        <span v-else>C</span>
                    </button>
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="negative">
                        <font-awesome-icon :icon="['fas', 'plus-minus']" />
                    </button>
                    <button class="bg-secondary text-dark fw-medium w-100" data-action="percent">
                        <font-awesome-icon :icon="['fas', 'percent']" />
                    </button>
                    <button class="function bg-danger w-100" data-action="divide">
                        <font-awesome-icon icon="fa-solid fa-divide" />
                    </button>
                </div>
                <!-- 2nd line -->
                <div class="col d-flex gap-2 justify-content-between mb-2">
                    <button class="bg-gray-100 text-white w-100">7</button>
                    <button class="bg-gray-100 text-white w-100">8</button>
                    <button class="bg-gray-100 text-white w-100">9</button>
                    <button class="function bg-danger w-100" data-action="multiply">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <!-- 3rd line -->
                <div class="col d-flex gap-2 justify-content-between mb-2">
                    <button class="bg-gray-100 text-white w-100">4</button>
                    <button class="bg-gray-100 text-white w-100">5</button>
                    <button class="bg-gray-100 text-white w-100">6</button>
                    <button class="function bg-danger w-100" data-action="subtract">
                        <font-awesome-icon icon="fa-solid fa-minus" />
                    </button>
                </div>
                <!-- 4th line -->
                <div class="col d-flex gap-2 justify-content-between mb-2">
                    <button class="bg-gray-100 text-white w-100">1</button>
                    <button class="bg-gray-100 text-white w-100">2</button>
                    <button class="bg-gray-100 text-white w-100">3</button>
                    <button class="function bg-danger w-100" data-action="add">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
                <!-- last line -->
                <div class="col d-flex gap-2 justify-content-between">
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

const { finalInput, currentInput, isFinalResult } = storeToRefs(calcStore);

</script>