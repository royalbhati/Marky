import jwtDecode from 'jwt-decode'

const getToken=()=>{
    if(localStorage.getItem("id_Token")){
        return jwtDecode(localStorage.getItem("id_Token")).at_hash;
    }
}

export default getToken