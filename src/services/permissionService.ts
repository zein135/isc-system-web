import jsonClient from "./jsonServerInstance"

export const getPermissions = async ()=>{
    const response = await jsonClient.get('permissions/');
    if(response.status === 200){
        return response.data
    }else{
        throw Error("Faild to get permissions")
    }
}