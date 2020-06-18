import Cookie from "cookiejs";
const token="admin_token";
const username="username";
export function getToken(){
    return Cookie.get(token);
}
export function setToken(value){
    return Cookie.set(token,value);
}
export function removeToken(){
    return Cookie.remove(token);
}
export function removeUsername(){
    return Cookie.remove(username);
}
export function getUsername(){
    return Cookie.get(username);
}
export function setUsername(value){
    return Cookie.set(username,value);
}