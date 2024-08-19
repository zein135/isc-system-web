import jsonClient from "./jsonServerInstance"

export const getRoles = async ()=>{
    const response = await jsonClient.get('roles/');
    if(response.status === 200){
        return response.data
    }else{
        throw Error("Faild to get roles")
    }
}