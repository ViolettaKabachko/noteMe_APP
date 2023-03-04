import { sendData } from "./fetch.js";

addEventListener('DOMContentLoaded', async () => {
    let b_1 = document.querySelector(".btn");
    
    b_1.addEventListener("click", async () => {
        const error = document.querySelector(".error");
        const mail = document.querySelector(".email");   
        const password = document.querySelector(".password")
        const first_name = document.querySelector(".name");   
        const second_name = document.querySelector(".second-name")
        const nick = document.querySelector(".nick")
        const age = document.querySelector(".age")
        const form = [first_name.value, second_name.value, nick.value, age.value, mail.value, password.value]
        console.log(error)
        function clear() {
            first_name.value = "",
            second_name.value = "",
            age.value = "",
            mail.value = "";
            password.value = "";
            nick.value = ""; 
        }

        const f = (elem) => elem == "";

        if (form.some(f)) {
            error.innerHTML = "Some field is empty, fill again";

            clear();
        }
        else {
            const data = {
                "first_name": first_name.value,
                "second_name": second_name.value,
                "nick": nick.value,
                "age": parseInt(age.value),
                "e-mail": mail.value,
                "password": password.value
            }  
            console.log("Sent")      
            await sendData('http://127.0.0.1:5000/reg', JSON.stringify(data));
            error.innerHTML = "You registered successfully, go to the login screen";
            error.style = "color: rgb(50, 222, 116)"
            clear();
        }
          
        
        }
    )
}
)
