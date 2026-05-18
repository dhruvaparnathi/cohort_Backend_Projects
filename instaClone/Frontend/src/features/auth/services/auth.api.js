import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
});

// Add request interceptor (silent in production/deploy)
api.interceptors.request.use(
    (config) => {
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
        // console.error('Register error:', err.response?.data || err.message); // unnecessary debug log
        throw err;
    }
}

export async function login(username, password) {
    
    try{
        const response = await api.post("/auth/login", {

            username,
            password
        });
        return response.data;
    }catch(err){
        // console.error('Login error:', err.response?.data || err.message); // unnecessary debug log
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