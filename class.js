class FormValidata{
    constructor(){
        this.cardNumber = document.querySelector(".card-number");
        this.cardHolder = document.querySelector(".card-holder");
        this.cardmmDate = document.querySelector(".card-mm-date");
        this.cardyyDate = document.querySelector(".card-yy-date");
        this.cardCVC = document.querySelector(".card-cvc");
        this.userData = [this.cardNumber , this.cardHolder , this.cardmmDate , this.cardyyDate , this.cardCVC];
        this.bolean;
        this.error;
        this.arrayLike = [
            {
                element : this.cardNumber,
                minLength : 19,
                identifier : "CVC"
            },
            {
                element : this.cardCVC,
                minLength : 3,
                identifier : "Card"
            }
        ]
    }
    isNotEmpty(){
       this.userData.forEach(e => {
           if(e.value === ""){
                e.parentElement.classList.add("is-error");
                this.bolean = false;
        }else {
                e.parentElement.classList.remove("is-error");
                this.bolean = true
        }
       })
       return this.bolean;
    }
    isLengthRespected(){
        for(let item of this.arrayLike){
            console.log(item)
            if(item.element.value.length !=item.minLength){
                this.error = `Enter a valid ${item.identifier}'s number`;
                item.element.parentElement.classList.add("is-error");
                document.querySelector(".error-message").innerHTML = this.error;
                this.bolean = false;
            }else {
                this.error = false;
                item.element.parentElement.classList.remove("is-error");
                return this.bolean;

            }
        }
    }

    patternMatch({input  , template}){
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
  
}
const submitBTN = document.querySelector("#submitBtn");
const form = new FormValidata();
console.log(form.cardCVC)
submitBTN.addEventListener("click" , function(e){
    e.preventDefault();
    if(form.isNotEmpty()){
        form.isLengthRespected()
    }
})



