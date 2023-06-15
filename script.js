// Created on 15-04-2023
//Lastly Updated on 15-04-2023
//I Know I really messed up with these but it works quite good.


//Defining necessary variables
let str="";
let exp=0;
let op='';
let dispStr=''
let result=0;
let display=document.querySelector('.display');
let output=document.querySelector('.output')
const divs = document.querySelectorAll('.main-container>div');


//numberpad keypress
document.addEventListener("keypress",(e)=>{
    if(e.key >= "0" && e.key <="9"){ 
        display.textContent+=e.key;   
        str+=e.key;
        dispStr+=e.key;
    }
    
})

//Where the actual event occurs.
divs.forEach((div)=>{
    div.addEventListener(('click'),(e)=>{
      
        display.textContent=" "    //Cleaning output
        str+=e.target.className;  //Storing at str variable which will act as the main variable for the operation
    
    //If AC occurs 
    if(e.target.id==="all-clear"){ 
        output.textContent=''
        display.textContent='';
        str='';
        op=''
        exp=0;
        dispStr=''
    } 
    //If already had a operator
    if((str[0]=="+")||(str[0]=="*")||(str[0]=="/"||(str[0]=='-')||str[0]=="=")){
        str='';
    }
    else{ //else then we can go furthur.
        dispStr+=e.target.className;   //for Displaying purpose defined a DispStr 

            //If C occurs
            if(e.target.id=="clear"){
                let len=dispStr.length-1;
                if((dispStr[len]!="+")&&(dispStr[len]!="-")&&(dispStr[len]!="*")&&(dispStr[len]!="/")){
                    clearFn();
                }
            }

        output.textContent = dispStr; //Updated DispStr on Displays

        if(e.target.id=="operator"){  //If operator triggers.
            if(op=="+"){
                result=sum(exp,+str.substring(0,str.length-1))
                displayFn(e);
            }
            if(op=="-"){
                result=subtract(exp,+str.substring(0,str.length-1))
                displayFn(e);

            }
            if(op=="*"){
                result=multiply(exp,+str.substring(0,str.length-1))
                displayFn(e);

            }
            if(op=="/"){
                result=divide(exp,+str.substring(0,str.length-1))
                displayFn(e);

            }
            //for the initial value
            if(op==''){
                exp= +str.substring(0,str.length-1);
                str='';
                op=e.target.className;
            }

            //for equals
            if(e.target.className=='='){
                if(isNaN(result)) result =0;
                output.textContent=dispStr
                str='';
                op=''
                exp=0;
                display.textContent=`${result}`;
                dispStr=''
            }
        }
    }
    })
})




// For the displaying purpose
function displayFn(e){
    exp=result
    op=e.target.className;
    str='';
}

//Clear Function
function clearFn(){
    str=str.substring(0,str.length-1)
    dispStr=dispStr.substring(0,dispStr.length-1)
    output.textContent=dispStr;
}


//Operation functions....
function sum(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
  if(a/b=="Infinity") return 0;
  else{
    return a/b.toFixed(2);
  }
}