import { sendData, checkCookie} from "./fetch.js";

const logout = () => {
    document.cookie = 'user-on-site=null; max-age=0';
    document.location.href = '/'
    localStorage.clear();
}

// if (!document.cookie || document.cookie.split('=')[1] != localStorage.getItem('info_to_insert').split(',')[5] ) {
//     document.location.href = '/'
// }

checkCookie()
addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector(".name");
    const surname = document.querySelector(".surname");
    const nick = document.querySelector(".nick");
    const data = localStorage.getItem('info_to_insert').split(',');
    const ava = document.querySelector('img');
    const button1 = document.querySelector('.btn1');
    const button2 = document.querySelector('.btn2')
    const letters = document.querySelector('.textarea')
    const logout_btn = document.querySelector('.logout')
    const inf = document.querySelector('.sucs')
    
    logout_btn.addEventListener("click", logout)
    console.log(data)
    
    if (data[7]) {
        ava.src = data[7]
    }
    else {
        ava.src = 'istockphoto-1087531642-170667a.jpg'
    }
    name.innerHTML = data[1];
    surname.innerHTML = data[2];
    nick.innerHTML = data[3];

    // button1.addEventListener('click', async () => {
    //     bytes = document.querySelector('.choose').value
    //     const sendData = async (url, data) => {       
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             body: data
    //         })
    //         return await response.json();
    
    //     }
    //     await sendData('http://127.0.0.1:5000/ava', bytes)
    // })

    button2.addEventListener('click', async () => {
        let text =  letters.value
        if (text.length < 10) {
            alert('Post is too short!')
        }
        else {
            await sendData('http://127.0.0.1:5000/upload_post', JSON.stringify({"text": text, "user_id": data[0]}))
        inf.innerHTML = 'Post successfully uploaded';
        alert('Post successfully uploaded')
        letters.value = ""
        } 
    })

})
