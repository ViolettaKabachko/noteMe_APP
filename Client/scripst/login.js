import { sendData, checkCookie } from "./fetch.js";


checkCookie()
addEventListener('DOMContentLoaded', async () => {
    console.log(document.cookie.split('=')[1])
    var b_1 = document.querySelector(".btn");
    
    b_1.addEventListener("click", async () => {
        const error = document.querySelector(".error");
        const mail = document.querySelector(".email");   
        const password = document.querySelector(".password");
        const data = {
            "email": mail.value,
            "password": password.value
        }  
        console.log("Sent")      
        const resp = await sendData('http://127.0.0.1:5000/login', JSON.stringify(data));
        mail.value = "";
        password.value = "";
        if (resp == "Data is incorrect") {           
            error.innerHTML = resp[0];
        }
        else {
            localStorage.setItem('info_to_insert', resp)
            document.cookie = `user-on-site=${resp[5]}; max-age=43200`;
            document.location.href = "/users_page.html"
            
        }
        }
    )
}
)
