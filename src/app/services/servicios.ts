export const uri_base = "https://flask-angulas.herokuapp.com";
export const uri_api = "https://flask-angulas.herokuapp.com/api/v1";
//export const uri_base = "http://127.0.0.1:5000";
//export const uri_api = "http://127.0.0.1:5000/api/v1";


export const isLoggin = async () => {
    try {
        var access_token = localStorage.getItem("access_token") || false;
        if(!access_token) return false;
        var user = await fetch(`${uri_api}/user`, {headers: headers()}).then(res => res.json()).catch(er => console.log(er));
        if(user.status_code == "200" || user.status_code == 200){
            localStorage.setItem("user", JSON.stringify(user.data));
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const headers = () => {
    return {
        "Authorization":`JWT ${localStorage.getItem('access_token') || "access_token"}`,
        "Content-Type":"application/json"
    }
}

export const requests = (method, body) => {
    return {
        method: method,
        headers: headers(),
        body: JSON.stringify({...body})
    };
}

export const login = async(credentials) => {
    try {
        var {access_token} = await fetch(`${uri_base}/auth`, requests('POST', credentials)).then(res => res.json()).catch(er => console.log(er));
        if(access_token){
            localStorage.setItem("access_token",access_token);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const register = async(credentials, callback) => {
    callback("");
    var user = await fetch(`${uri_api}/register`, requests('POST', credentials)).then(res => res.json()).catch(er => console.log(er));
    if(user.status_code == "200" || user.status_code == 200){
        localStorage.setItem("user", JSON.stringify(user.data));
        return true;
    }
    if(user.error){
        callback(user.description);
    }
    return false;
}

export const puntuation = async() => {
    var data = await fetch(`${uri_api}/puntuation`, {headers: headers()}).then(res => res.json()).catch(er => console.log(er));
    if(data.status_code == "200" || data.status_code == 200){
        return data.data;
    }
    return false;
}

export const preguntas = async() => {
    var data = await fetch(`${uri_api}/questions`).then(res => res.json()).catch(er => console.log(er));
    if(data.status_code == "200" || data.status_code == 200){
        return data.data;
    }
    return [];
}

export const leaders = async() => {
    var data = await fetch(`${uri_api}/leaderboard`).then(res => res.json()).catch(er => console.log(er));
    if(data.status_code == "200" || data.status_code == 200){
        return data.data;
    }
    return [];
}

export const  spuntuacion = async(body) => {
    var data = await fetch(`${uri_api}/puntuation`, requests('POST',body)).then(res => res.json()).catch(er => console.log(er));
    if(data.status_code == "200" || data.status_code == 200){
        return data.data;
    }
    return false;
}