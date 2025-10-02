const URL_API = "https://68dc4b637cd1948060a9f1ad.mockapi.io/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getSucursales = async() => {
    try {
        const respuesta = await fetch(`${URL_API}sucursales`);
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            return datos;
        } else {
            console.log('Error al obtener sucursales');
            return [];
        } 
    } catch(error){
        console.log(error);
        return [];
    }
}

const postSucursal = async (datos) => {
    try {
        const response = await fetch(`${URL_API}sucursales`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en POST sucursal:', error.message);
        throw error;
    }
}

const patchSucursal = async (datos, id) => {
    try {
        const response = await fetch(`${URL_API}sucursales/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en PATCH sucursal:', error.message);
        throw error;
    }
}

const deleteSucursal = async (id) => {
    try {
        const response = await fetch(`${URL_API}sucursales/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        return await response.json();
    } catch (error) {
        console.error('Error en DELETE sucursal:', error.message);
        throw error;
    }
}

export {
    getSucursales,
    postSucursal,
    patchSucursal,
    deleteSucursal
};