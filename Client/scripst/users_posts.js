import { sendData } from "./fetch.js";

addEventListener('DOMContentLoaded', async () => {
    const line = document.querySelector('.posts');
    //console.log(localStorage.getItem('info_to_insert').split(','))
    const res = await sendData('http://127.0.0.1:5000/users_posts', 
    JSON.stringify({"user_id": localStorage.getItem('info_to_insert').split(',')[0]}))
    console.log(res)
    for (let i = 0; i < res.length; i++) {    
        let inner_text1 = document.createElement('p')
        inner_text1.className = 'list-post'
        let inner_text2 = document.createElement('p')
        inner_text2.className = 'list-post-date'
        inner_text1.innerHTML = `${res[i][0]}`     
        line.appendChild(inner_text1)
        // line.appendChild(document.createElement('br'))
        inner_text2.innerHTML = `posted: ${res[i][1]}`     
        line.appendChild(inner_text2)
    }
})

