import jsonClient from "./jsonServerInstance"

export const getRoles = async ()=>{
  try {
    const response = await jsonClient.get('roles/');
    return response.data
  } catch (error) {
    throw new Error('Failed to get roles: ' + (error as Error).message);
  }
}

export const addRole = async (role: {}) => {
  try {
    const response = await jsonClient.post('roles/', role);
    return response.data;
  }catch (error) {
    throw new Error('Failed to add role: ' + (error as Error).message);
  }
};