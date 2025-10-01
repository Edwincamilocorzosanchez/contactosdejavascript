const URL_API = "https://68dc4b637cd1948060a9f1ad.mockapi.io/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getContact = async() => {
    try {
        const respuesta = await fetch(`${URL_API}contactos`);
        // Si la respuesta es correcta
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            return datos; // IMPORTANTE: Retornar los datos
        } else if(respuesta.status === 401){
            console.log('La url no es correcta');
            return [];
        } else if(respuesta.status === 404){
            console.log('El contacto no existe');
            return [];
        } else {
            console.log('Se presento un error en la peticion consulte al Administrador');
            return [];
        } 
    } catch(error){
        console.log(error);
        return [];
    }
}

const postContact = async (datos) => {
    try {
        return await fetch(`${URL_API}contactos`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

const patchContact = async (datos,id) =>{
    try {
        return await fetch(`${URL_API}contactos/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
}

const deleteContact = async (id) =>{
    try {
        return await fetch(`${URL_API}contactos/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}

export {
    getContact as getContacts,
    postContact as postContacts,
    patchContact as patchContacts,
    deleteContact as deleteContacts
};