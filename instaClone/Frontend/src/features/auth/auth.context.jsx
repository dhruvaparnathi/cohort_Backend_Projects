import { useState, createContext } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [followingsData, setFollowingsData] = useState(null);
    const [followersData, setFollowersData] = useState(null);

    const handleRegister = async (username, email, password) => {

        setLoading(true)

        try{
            const response = await register(username, email, password);
            setUser(response.user);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogin = async (username, password) => {

        setLoading(true)

        try{
            const response = await login(username, password);
            setUser(response.user);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleGetMe = async () => {

        setLoading(true);
        try{
            const response = await getMe();
            setUser(response.user);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleGetFollowings = async () => {

        setLoading(true);
        try{
            const response = await handleGetFollowings();
            setFollowingsData(response.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    const handleGetFollowers = async () => {

        setLoading(true);
        try{
            const response = await handleGetFollowers();
            setFollowersData(response.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{user, followingsData, followersData, loading, handleLogin, handleRegister, handleGetMe, handleGetFollowings, handleGetFollowers}}>
            {children}
        </AuthContext.Provider>
    )
}       