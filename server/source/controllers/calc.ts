// calculate equation
  
const calc = (firstValue: number, operator:string, secondValue:number): number => {
    if (operator == "+"){
        return firstValue + secondValue;
    }
    else if (operator == "-"){
        return firstValue - secondValue;
    }
    else if (operator == "/"){
        return firstValue / secondValue;
    }
    else if (operator == "*"){
        return firstValue * secondValue;
    }
    else if (operator == "%"){
        return firstValue % secondValue;
    }
    else if (operator == "//"){
        return Math.round(firstValue / secondValue);
    }
    else if (operator == "^"){
        return firstValue ** secondValue;
    }
    return firstValue;
};

export default { calc };
