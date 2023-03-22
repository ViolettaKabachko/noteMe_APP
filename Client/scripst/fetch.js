const sendData = async (url, data) => {       
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    return await response.json();
}

const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const checkCookie = async () => {
    // if (document.cookie.split('=')[1] == localStorage.getItem('info_to_insert')[0]) {
    //     const data = {
    //         "email": document.cookie.split('=')[1]
    //     }
    //     const resp = await sendData('http://127.0.0.1:5000/login', JSON.stringify(data));
    //     console.log(resp)
    //     localStorage.setItem('info_to_insert', resp)
        //document.location.href = "/users_page.html"
    if (document.cookie || localStorage.getItem('info_to_insert')) {
        if (document.cookie.split('=')[1] == localStorage.getItem('info_to_insert').split(',')[5]) {
            return true
        }
        else {
            localStorage.clear()
            document.cookie = ''
            location.href = '/'
        }
    }
    else {
        if (location.href != 'http://127.0.0.1:5500/') {
            location.href = '/'
        }
    }
    
}
export {sendData, getData, checkCookie}