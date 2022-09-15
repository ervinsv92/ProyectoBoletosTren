const BASE_URL = 'http://localhost:3000/';

export const ajax = async (endPoint, data = {}, method = 'GET')=>{
    const url = `${BASE_URL}${endPoint}`;
    let res;
    if(method === 'GET'){
        res = await fetch(url);
    }else{
        res = await fetch(url, {
            method,
            headers:{
                'Content-type':'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    return await res.json();
}