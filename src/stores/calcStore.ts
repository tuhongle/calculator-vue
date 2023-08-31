import { ref, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useCalcStore = defineStore('calculator', () => {
    const finalResult = ref<string>('0');
    const operatorKey = ref<boolean>(false);
    const operator = ref();
    const prevKey = ref<string>();
    const currentValue = ref<string>('');
    const expressionFunc = ref<string>('0');
    

    const trackAction = (el : MouseEvent) => {
        if ((el.target as Element).matches('button')) {
            const action = (el.target as HTMLElement).dataset.action;
            if (action) {
                if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                    switch (action) {
                        case 'add':
                            operator.value = '+';
                            break;
                        case 'subtract':
                            operator.value = '-';
                            break;
                        case 'multiply':
                            operator.value = '*';
                            break;
                        case 'divide':
                            operator.value = '/';
                            break;
                    };
                    if (!operatorKey.value) {
                        if (!currentValue.value) {
                            expressionFunc.value = '0'.concat(operator.value);
                        } else {
                            expressionFunc.value = currentValue.value.concat(operator.value);
                        }
                    } else {
                        expressionFunc.value += currentValue.value;
                        finalResult.value = calculator(expressionFunc.value);
                    }
                    operatorKey.value = true;
                    currentValue.value = '';
                } else {
                    switch (action) {
                        case 'clear':
                            console.log('clear');
                            break;
                        case 'negative':
                            console.log('negative');
                            break;
                        case 'decimal':
                            console.log('decimal');
                            break;
                        case 'percent':
                            console.log('percent');
                            break;
                        case 'equal':
                            finalResult.value = calculator(expressionFunc.value);
                            break;
                    }
                };
            } else {
                const number : string = (el.target as HTMLElement).textContent!;
                currentValue.value += number;
                finalResult.value = currentValue.value;
            }
        }
    }

    const calculator = (data: string) => {
        return Function(`return (${data})`)();
    }

    const $reset = () => {
        finalResult.value = '0';
        currentValue.value = '0';
        operatorKey.value = false;
        operator.value = '';
        prevKey.value = '';
        expressionFunc.value = '0';
    }

    watchEffect(() => {
        console.log(expressionFunc.value);
    })

    return { finalResult, currentValue, trackAction }
})