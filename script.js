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
let checkCount=0;
handleSlider();

setIndicator("#ccc");




 function handleSlider(){
    inputSlider.value =passwordLength;
    lengthDisplay.innerText =passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
 }
 function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}
function getRndInteger(max,min){
    return Math.floor(Math.random()*(max-min) )+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
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
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}
function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
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

generateBtn.addEventListener('click',()=>{
     if(checkCount==0)
     return;

     if(checkCount>passwordLength){
        passwordLength=checkCount ;
        handleSlider();
     }


     password="";

     let funcArr=[];
     if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
     }
     if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
     }
     if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
     }
     if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
     }

     for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
     }
     for(let i=0;i<passwordLength-funcArr.length;i++){
        let r=getRndInteger(0,funcArr.length-1);
        password+=funcArr[r]();
     }

     password=shufflePassword(Array.from(password));
     passwordDisplay.value=password;
     calcStrength();


});