// const { handle } = require("express/lib/application");

const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password ="";
let passwordLength=10;
let checkCount=1;
handleSlider();






 function handleSlider(){
    inputSlider.value =passwordLength;
    lengthDisplay.innerText =passwordLength;

 }
 function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow - HW
}
function getRndInteger(max,min){
    return Math.floor(Math.random()*(max-min) )+min;
}
function generateRandomNumber(){
    return getRndInteger(0.9);
}
function generateLowerCase(){
    let a=getRndInteger(97,123);
    return String.fromCharCode(a);
}
function generateUpperCase(){
    let a =getRndInteger(67,91);
    return String.fromCharCode(a);
}
function generateSymbol(){
    let a =getRndInteger(0,symbols.length-1);
    return symbols.charAt(a);
}
function calcStrength(){
    let hasLower =false;
    let hasUpper=false;
    let hasSym =false;
    let hasNum=false;
    if(symbolsCheck.checked) hasSym=true;
    if(numbersCheck.checked) hasNum=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(uppercaseCheck.checked) hasUpper=true;
      
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }


}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }catch (e){
         copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active")
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox)=>{ 
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input', (e)=>{
    passwordLength= e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})