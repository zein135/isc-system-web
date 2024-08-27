import jsonClient from "./jsonServerInstance"

export const getRoles = async ()=>{
    const response = await jsonClient.get('roles/');
    if(response.status === 200){
        return response.data
    }else{
        throw Error("Failed to get roles")
    }
}

export const addRole = async (role: {}) => {
  try {
    console.log(role);
    const response = await jsonClient.post('roles/', role);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Failed to add role');
    }
  } catch (error) {
    throw new Error('Failed to add role: ' + (error as Error).message);
  }
};