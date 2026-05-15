import { useState, createContext, useEffect } from "react";
import { login, register, getMe, logout, getFollowings, getFollowers, followUser, unfollowUser, getFollowRequests, getPendingRequests, acceptFollowRequest, rejectFollowRequest } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [followingsData, setFollowingsData] = useState(null);
    const [followersData, setFollowersData] = useState(null);
    const [followRequestsData, setFollowRequestsData] = useState(null);
    const [pendingRequestsData, setPendingRequestsData] = useState(null);

    useEffect(() => {
        // Check if user is already logged in on app start
        handleGetMe();
    }, []);

    const handleRegister = async (username, email, password) => {

        setLoading(true)

        try{
            const response = await register(username, email, password);
            setUser(response.user);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }finally{
            setLoading(false);
        }
    }

    const handleLogin = async (username, password) => {

        setLoading(true)

        try{
            const response = await login(username, password);
            setUser(response.user);
            await Promise.all([
                handleGetFollowings(),
                handleGetFollowRequests(),
                handleGetPendingRequests()
            ]);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }finally{
            setLoading(false);
        }
    }

    const handleGetMe = async () => {

        const wasLoading = loading;
        if (!wasLoading) setLoading(true);
        try{
            const response = await getMe();
            setUser(response.user);
            return response;
        }catch(err){
            const status = err?.response?.status;
            if (status !== 401 && status !== 409) {
                console.log(err);
            }
            setUser(null);
            return null;
        }finally{
            setLoading(false);
        }
    }

    const handleGetFollowings = async () => {

        try{
            const response = await getFollowings();
            setFollowingsData(response);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    const handleGetFollowers = async () => {

        try{
            const response = await getFollowers();
            setFollowersData(response);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    const handleGetFollowRequests = async () => {

        try{
            const response = await getFollowRequests();
            setFollowRequestsData(response);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    const handleGetPendingRequests = async () => {

        try{
            const response = await getPendingRequests();
            setPendingRequestsData(response);
            return response;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    const handleAcceptFollowRequest = async (username) => {
        try {
            const response = await acceptFollowRequest(username);
            await Promise.all([
                handleGetFollowRequests(),
                handleGetFollowers()
            ]);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleRejectFollowRequest = async (username) => {
        try {
            const response = await rejectFollowRequest(username);
            await handleGetFollowRequests();
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleFollowUser = async (username) => {
        try {
            const response = await followUser(username);
            await Promise.all([
                handleGetPendingRequests(),
                handleGetFollowings()
            ]);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleUnfollowUser = async (username) => {
        try {
            const response = await unfollowUser(username);
            await Promise.all([
                handleGetFollowings(),
                handleGetPendingRequests()
            ]);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try{
            await logout();
            setUser(null);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{user, followingsData, followersData, followRequestsData, pendingRequestsData, loading, handleLogin, handleRegister, handleGetMe, handleGetFollowings, handleGetFollowers, handleGetFollowRequests, handleGetPendingRequests, handleFollowUser, handleUnfollowUser, handleAcceptFollowRequest, handleRejectFollowRequest, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}       