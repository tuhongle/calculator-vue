<template>
  <div class="calculator-wrapper bg-info vw-100 vh-100 d-flex justify-content-center align-items-center">
    <div class="container-fluid d-flex bg-dark p-4 shadow-lg rounded-4">
        <div class="row h-100">
            <div class="mt-auto">
                <div class="col mb-4 result">
                    <input type="tel" v-model="finalResult" class="w-100 display-2 border-0 text-end bg-transparent text-white" @click="backspace">
                </div>
                <!-- 1st line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-secondary text-dark fw-medium w-100">
                        <span v-if="!finalResult">AC</span>
                        <span v-else>C</span>
                    </button>
                    <button class="bg-secondary text-dark fw-medium w-100">+/-</button>
                    <button class="bg-secondary text-dark fw-medium w-100">
                        <font-awesome-icon :icon="['fas', 'percent']" />
                    </button>
                    <button class="bg-danger w-100">
                        <font-awesome-icon icon="fa-solid fa-divide" />
                    </button>
                </div>
                <!-- 2nd line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '7']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '8']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '9']" />
                    </button>
                    <button class="bg-danger w-100">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>
                </div>
                <!-- 3rd line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '4']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '5']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '6']" />
                    </button>
                    <button class="bg-danger w-100">
                        <font-awesome-icon icon="fa-solid fa-minus" />
                    </button>
                </div>
                <!-- 4th line -->
                <div class="col d-flex gap-3 justify-content-between mb-3">
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '1']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '2']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">
                        <font-awesome-icon :icon="['fas', '3']" />
                    </button>
                    <button class="bg-danger w-100">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
                <!-- last line -->
                <div class="col d-flex gap-3 justify-content-between">
                    <button class="long rounded-pill bg-gray-100 text-white text-start">
                        <font-awesome-icon :icon="['fas', '0']" />
                    </button>
                    <button class="bg-gray-100 text-white w-100">,</button>
                    <button class="bg-danger w-100 equal">
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

const { finalResult } = storeToRefs(calcStore);
</script>