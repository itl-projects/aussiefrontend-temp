import * as axios from 'axios';

export function getAllPetTypes(){
    //const url ="http://95.217.133.127:70/api/pet/breed/?type=Dog"
};

export async function getPetTypes(type){
    const url = "http://95.217.133.127:70/api/pet/breed/?type="+type;
    axios.get(url).then(res=>{
            return res;
    })
    .catch(err =>{
        return err;
    })
}