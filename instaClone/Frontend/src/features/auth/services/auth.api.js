import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
});

console.log('API baseURL:', api.defaults.baseURL);

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url, 'withCredentials:', config.withCredentials);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function register(username, email, password){
    
    try{
        const response = await api.post("/auth/register",{
            username,
            email,
            password
        });
        return response.data;
    }catch(err){
        console.error('Register error:', err.response?.data || err.message);
        throw err;
    }
}

export async function login(username, password) {
    
    try{
        console.log('Making login request to:', api.defaults.baseURL + "/auth/login");
        console.log('With data:', { username, password });
        const response = await api.post("/auth/login", {
            username,
            password
        });
        console.log('Login response:', response);
        return response.data;
    }catch(err){
        console.error('Login error:', err.response?.data || err.message);
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

export async function followUser(username){
    try{
        const response = await api.post(`/user/follow/${username}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function unfollowUser(username){
    try{
        const response = await api.post(`/user/unfollow/${username}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function getFollowRequests(){
    try{
        const response = await api.get('/user/followrequests');
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function getPendingRequests(){
    try{
        const response = await api.get('/user/pendingrequests');
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function acceptFollowRequest(username){
    try{
        const response = await api.post(`/user/accept/${username}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function rejectFollowRequest(username){
    try{
        const response = await api.post(`/user/reject/${username}`);
        return response.data;
    }catch(err){
        throw err;
    }
}

export async function logout(){

    try{
        const response = await api.post('/auth/logout');
        return response.data;
    }catch(err){
        throw err;
    }
}