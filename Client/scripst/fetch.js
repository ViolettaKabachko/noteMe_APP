const sendData = async (url, data) => {       
    const response = await fetch(url, {
        method: 'POST',
        body: data
    })
    return await response.json();
}

const getData = async (url) => {
    const response = await fetch(url);
    return response.json();
}

export {sendData, getData}