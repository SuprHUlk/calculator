let a="",b="",op="";

const numberButtons=document.querySelectorAll(".btn-number");
const operationButtons=document.querySelectorAll(".btn-operation");
const equal=document.querySelector("#operator");
const reset=document.querySelector("#clear");
const screen=document.querySelector(".screen");

numberButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        screen.textContent=appendNumber(button.textContent);
    });
});

operationButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        screen.textContent+=operation(button.textContent);
        if(b!=""&&a=="") {
            a=b;
            b="";
        }
    });
});

equal.addEventListener('click',()=>{
    if(a!==""&&b!==""&&op!=="") {
        screen.textContent=operate(a,b,op);
    }
});

reset.addEventListener('click',()=>{
    clear();
});

function appendNumber(s) {
    b+=s;
    return b;
}

function operation(o) {
    if(a!=""&&b!="") {
        a=operate(a,b,op);
        b="";
    }
    op=o;
    return op;
}

function operate(a,b,op) {
    a=parseFloat(a);
    b=parseFloat(b);
    if(op==="+") {
        return add(a,b);
    }
    else if(op==="-") {
        return sub(a,b);
    }
    else if(op==="*") {
        return mul(a,b);
    }
    else if(op==="/") {
        if(b==0) {
            return "Can't divide by zero";
        }
        return div(a,b);
    }
}

function add(a,b) {
    return a+b;
}

function sub(a,b) {
    return a-b;
}

function mul(a,b) {
    return a*b;
}

function div(a,b) {
    return a/b;
}

function clear() {
    a="",b="",op="";
    screen.textContent="";
}
