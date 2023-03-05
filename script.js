// first step : verify non empty is empty on submit
// second step : verify the validity of the input data
// formatting the entered data
// displaying the entered data
let cardNumber = document.querySelector(".card-number");
let cardHolder = document.querySelector(".card-holder");
let cardmmDate = document.querySelector(".card-mm-date");
let cardyyDate = document.querySelector(".card-yy-date");
let cardCVC = document.querySelector(".card-cvc");
let userData = [cardNumber , cardHolder , cardmmDate , cardyyDate , cardCVC];


const submitBTN = document.querySelector("#submitBtn");
// let formData = document.querySelectorAll(".input-group");

// const cardNumberValue = document.querySelector(".card-number");

function isNotEmpty(){
    let bolean
    userData.forEach(element => {
        if(element.value === ""){
            element.parentElement.classList.add('is-error');
            bolean = false;
          
        }else{
            element.parentElement.classList.remove('is-error')
           bolean = true
        }
    })
    return bolean;
  }
// can't we use a object to verify the entire list
let arrayLike = [
    {
        element : cardNumber,
        minLength : 19,
        identifier : "CVC"
    },
    {
        element : cardCVC,
        minLength : 3,
        identifier : "Card"
    }
]


function isLengthRespected(data){
    let error = "";
    let bolean;
    for(item of data){
    
        if(item.element.value.length != item.minLength){
            error = `Enter a valid ${item.identifier}'s number`;
            item.element.parentElement.classList.add("is-error");
            document.querySelector(".error-message").innerHTML = error;
            bolean = false;
        }else{
            error = "";
            item.element.parentElement.classList.remove("is-error")
            bolean = true;
        }
    }
    return bolean
  }


cardHolder.addEventListener("input" , function(e){
    document.getElementById("username").innerHTML = e.target.value
})
cardmmDate.addEventListener('input',function(e){
    e.target.value = ("" + e.target.value).replace(/\D/g, "");
    document.getElementById("month").innerHTML = e.target.value;
    
})
cardCVC.addEventListener("input", function(e){
    e.target.value = ("" + e.target.value).replace(/\D/g, "");
    document.getElementById(e.target.dataset.key).innerHTML = e.target.value
})
cardyyDate.addEventListener("input" , function(e){
    e.target.value = ("" + e.target.value).replace(/\D/g, "");

    document.getElementById("year").innerHTML = e.target.value;
   
})
cardNumber.addEventListener('input' , function(e){
    e.target.value = ("" + e.target.value).replace(/\D/g, "");
    e.target.value = patternMatch({
        input: e.target.value,
        template : "xxxx xxxx xxxx xxxx",
    })
    if(e.target.value.length > 0){
        document.getElementById(e.target.dataset.key).innerHTML = e.target.value
    }
   
})


function patternMatch({input , template}){
    try{
        let j = 0 , plaintext = "", countj = 0;
        while(j < template.length){
            if(countj > input.length - 1){
                template = template.substring(0 , j);
                break;
            }
            if(template[j] == input[j]){
                j++;
                countj++;
                continue;
            }

            if(template[j] == "x"){
                template = template.substring(0 , j)+ input[countj] + template.substring(j + 1);
                plaintext = plaintext + input[countj];
                countj++;
            }
            j++
        }
        return template;
    }catch{
        return "";
    }
   
}

function isValid(){
    document.querySelector(".form_valid").style.display = "block";
    document.querySelector("form").style.display  = "none";
}
// isValid();
submitBTN.addEventListener('click' , function(e){
    e.preventDefault();
    if(isNotEmpty() === true){
      if(isLengthRespected(arrayLike)){
        document.querySelector(".wrapper__info").classList.add('is-done')
      }
    }
})





