let a="",b="",op="";

const numberButtons=document.querySelectorAll(".btn-number");
const operationButtons=document.querySelectorAll(".btn-operation");
const equal=document.querySelector("#operator");
const reset=document.querySelector("#clear");
const dot=document.querySelector("#dot");
const bs=document.querySelector("#backspace");
const theme=document.querySelector("#btn-theme");
const currentScreen=document.querySelector(".screen .current");
const previousScreen=document.querySelector(".screen .previous");

numberButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        currentScreen.textContent=appendNumber(button.textContent);
    });
});

dot.addEventListener('click',()=>{
    point();
})

operationButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        if(b!=""&&a=="") {
            a=b;
            b="";
            previousScreen.textContent=currentScreen.textContent+" "+operation(button.textContent);
        }
        operation(button.textContent);
    });
});

equal.addEventListener('click',()=>{
    if(a!==""&&b!==""&&op!=="") {
        previousScreen.textContent+=" "+currentScreen.textContent+" "+"="+" ";
        currentScreen.textContent=operate(a,b,op).slice(0,15);
    }
});

bs.addEventListener('click',()=>{
    backspace();
});

reset.addEventListener('click',()=>{
    clear();
});

window.addEventListener('keydown',keyboard);

theme.addEventListener('click',()=>{
    const mode=document.querySelector(":root").className==="dark"?"light":"dark";
    document.querySelector(":root").className=mode;
    if(theme.textContent==="DARK") {
        theme.textContent="LIGHT";
    }
    else {
        theme.textContent="DARK";
    }
})

function appendNumber(s) {
    b+=s;
    return b;
}

function point() {
    if(currentScreen.textContent=="") {
        currentScreen.textContent=appendNumber("0.");
    }
    if(currentScreen.textContent.includes(".")) {
        return;
    }
    else {
        currentScreen.textContent=appendNumber(".");
    }
}

function operation(o) {
    if(a!=""&&b!="") {
        a=operate(a,b,op);
        previousScreen.textContent=a+" "+o;
        b="";
        currentScreen.textContent=a;
    }
    op=o;
    return op;
}

function operate(a,b,op) {
    a=parseFloat(a);
    b=parseFloat(b);
    if(op==="+") {
        return String(add(a,b));
    }
    else if(op==="-") {
        return String(sub(a,b));
    }
    else if(op==="x") {
        return String( mul(a,b));
    }
    else if(op==="÷") {
        if(b==0) {
            return "Can't divide by zero";
        }
        return String(div(a,b));
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

function backspace() {
    if(currentScreen.textContent!="") {
        currentScreen.textContent=(currentScreen.textContent).slice(0,currentScreen.textContent.length-1);
        b=currentScreen.textContent;
    }
}

function clear() {
    a="",b="",op="";
    currentScreen.textContent="";
    previousScreen.textContent="";
}

function keyboard(e) {
    if(e.key>=0&&e.key<=9) {
        currentScreen.textContent=appendNumber(e.key);
    }
    if(e.key===".") {
        point();
    }
    if(e.key==="="||e.key==="Enter") {
        if(a!==""&&b!==""&&op!=="") {
            previousScreen.textContent+=" "+currentScreen.textContent+" "+"="+" ";
            currentScreen.textContent=operate(a,b,op).slice(0,15);
        }
    }
    if(e.key==="Backspace") {
        backspace();
    }
    if(e.key==="Escape") {
        clear();
    }
    if(e.key==="+"||e.key==="-") {
        if(b!=""&&a=="") {
            a=b;
            b="";
            previousScreen.textContent=currentScreen.textContent+" "+operation(e.key);
        }
        operation(e.key);
    }
    if(e.key==="*") {
        if(b!=""&&a=="") {
            a=b;
            b="";
            previousScreen.textContent=currentScreen.textContent+" "+operation("x");
        }
        operation("x");
    }
    if(e.key==="/") {
        if(b!=""&&a=="") {
            a=b;
            b="";
            previousScreen.textContent=currentScreen.textContent+" "+operation("÷");
        }
        operation("÷");
    }
}
