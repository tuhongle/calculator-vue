import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCalcStore = defineStore('calculator', () => {
    const finalResult = ref<string>('0');
    const isFinalResult = ref<boolean>(false);
    const isPrevOperator = ref<boolean>(false);
    const currentAction = ref<string>();
    const operator = ref();
    const currentValue = ref<string>('0');
    const num1 = ref<number | undefined>(undefined);
    const num2 = ref<number | undefined>(undefined);
    const isStillNum1 = ref<boolean>(true);
    const operatorExp = ref<string>('');

    const currentInput = computed(() => {
        return (+currentValue.value).toLocaleString();
    })

    const finalInput = computed(() => {
        return (+finalResult.value).toLocaleString();
    })
    
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
                    const priorAction : boolean = (action === 'multiply' || action === 'divide') ? true : false;
                    if (isPrevOperator.value) {
                        operatorExp.value = operatorExp.value.slice(0, -1);
                        operatorExp.value += operator.value;
                    } else {
                        if (isStillNum1.value) {
                            operatorExp.value += currentValue.value;
                            num1.value = Function(`return (${operatorExp.value})`)();
                            finalResult.value = num1.value!.toString();
                            currentValue.value = '0';
                            isStillNum1.value = priorAction;
                            if (isStillNum1.value) {
                                operatorExp.value += operator.value;
                            }
                            currentAction.value = action;
                        } else {
                            if (!num2.value) {
                                operatorExp.value = '';
                            };
                            operatorExp.value += currentValue.value;
                            num2.value = Function(`return (${operatorExp.value})`)();
                            finalResult.value = num2.value!.toString();
                            currentValue.value = '0';
                            if (priorAction) {
                                operatorExp.value += operator.value;
                            } else {
                                num1.value = +calculator(num1.value!, currentAction.value!, num2.value!)!;
                                finalResult.value = num1.value.toString();
                                num2.value = undefined;
                                currentAction.value = action;
                            }
                        };
                    };
                    isPrevOperator.value = true;
                    isFinalResult.value = true;
                } else {
                    switch (action) {
                        case 'clear':
                            if (currentValue.value !== '0') {
                                isFinalResult.value = false;
                                currentValue.value = '0';
                            } else {
                                finalResult.value = '0';
                                isFinalResult.value = false;
                                $reset();
                            }
                            break;
                        case 'negative':
                            isFinalResult.value = false;
                            if (currentValue.value.charAt(0) === '-') {
                                currentValue.value = currentValue.value.substring(1);
                            } else {
                                currentValue.value = '-'+currentValue.value;
                            }
                            break;
                        case 'decimal':
                            isFinalResult.value = false;
                            if (currentValue.value.includes('.')) {
                                currentValue.value = '0.'
                            } else {
                                currentValue.value += '.';
                            }
                            break;
                        case 'percent':
                            isFinalResult.value = false;
                            if (isPrevOperator.value) {
                                currentValue.value = (num1.value!/100).toString();
                            } else {
                                currentValue.value = (+currentValue.value/100).toString();
                            };
                            isPrevOperator.value = false;
                            break;
                        case 'equal':
                            if (!num2.value) {
                                num2.value = +currentValue.value;
                            } else {
                                operatorExp.value += currentValue.value;
                                num2.value = Function(`return (${operatorExp.value})`)();
                            };
                            finalResult.value = calculator(num1.value!, currentAction.value!, num2.value!)!;
                            $reset();
                            break;
                    }
                };
            } else {
                isPrevOperator.value = false;
                isFinalResult.value = false;
                const number : string = (el.target as HTMLElement).textContent!;
                if (currentValue.value === '0') {
                    currentValue.value = number;
                } else if (currentValue.value === '-0') {
                    currentValue.value = '-'+number;
                } else {
                    currentValue.value += number;
                };
                currentValue.value = currentValue.value.slice(0,9);
            }
        } else if ((el.target as HTMLElement).matches('input')) {
            currentValue.value = currentValue.value.slice(0, -1);
        }
    }

    const calculator = (n1: number, action : string, n2:number) => {
        isFinalResult.value = true;
        switch (action) {
            case "add":
                return (n1 + n2).toString();
            case "subtract":
                return (n1 - n2).toString();
            case "multiply":
                return (n1 * n2).toString();
            case "divide":
                if ((n1 / n2).toString() === 'Infinity') {
                    return 'Error';
                } else {
                    return (n1 / n2).toString();
                }
        };
    }

    const $reset = () => {
        currentValue.value = '0';
        isStillNum1.value = true;
        operator.value = '';
        currentAction.value = '';
        operatorExp.value = '';
        isPrevOperator.value = false;
        num1.value = undefined;
        num2.value = undefined;
    }

    return { finalInput, currentInput, isFinalResult, trackAction }
})