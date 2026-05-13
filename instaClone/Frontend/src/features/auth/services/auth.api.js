import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true
});

export async function register(username, email, password){
    
    try{
        const response = await api.post("/auth/register",{
            username,
            email,
            password
        });
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function login(username, password) {
    
    try{
        const response = await api.post("/auth/login",{
            username,
            password
        });
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function getMe(){

    try{
        const response = await api.get('/auth/get-me');
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function getFollowings(){

    try{
        const response = await api.get('/user/followings');
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function getFollowers(){

    try{
        const response = await api.get('/user/followers');
        return response.data;
    }catch(err){
        throw err;
    }
}