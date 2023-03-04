addEventListener('DOMContentLoaded', async () => {
    var span = document.querySelector(".post");
    // const sendData = async (url, data) => {       
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: data
    //     })
    //     return await response.json();

    // }

    const getData = async (url) => {
        const response = await fetch(url);
        return response.json();
    }

    let res = getData("http://127.0.0.1:5000/posts/1");
    console.log(res)

})
