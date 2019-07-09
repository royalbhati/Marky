import jwtDecode from 'jwt-decode'

const getToken=()=>{
    if(localStorage.getItem("id_Token")){
        return jwtDecode(localStorage.getItem("id_Token")).aud;
    }
}

export default getToken