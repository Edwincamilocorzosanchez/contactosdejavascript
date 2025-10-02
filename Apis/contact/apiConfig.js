const URL_API = "https://68dc4b637cd1948060a9f1ad.mockapi.io/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

// ============ PAÍSES ============
const getPaises = async() => {
    try {
        const respuesta = await fetch(`${URL_API}paises`);
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            return datos;
        } else {
            console.log('Error al obtener países');
            return [];
        } 
    } catch(error){
        console.log(error);
        return [];
    }
}

const postPais = async (datos) => {
    try {
        const response = await fetch(`${URL_API}paises`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en POST país:', error.message);
        throw error;
    }
}

const patchPais = async (datos, id) => {
    try {
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en PATCH país:', error.message);
        throw error;
    }
}

const deletePais = async (id) => {
    try {
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        return await response.json();
    } catch (error) {
        console.error('Error en DELETE país:', error.message);
        throw error;
    }
}

// ============ REGIONES ============
const getRegiones = async() => {
    try {
        const respuesta = await fetch(`${URL_API}regiones`);
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            return datos;
        } else {
            console.log('Error al obtener regiones');
            return [];
        } 
    } catch(error){
        console.log(error);
        return [];
    }
}

const postRegion = async (datos) => {
    try {
        const response = await fetch(`${URL_API}regiones`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en POST región:', error.message);
        throw error;
    }
}

const patchRegion = async (datos, id) => {
    try {
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en PATCH región:', error.message);
        throw error;
    }
}

const deleteRegion = async (id) => {
    try {
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        return await response.json();
    } catch (error) {
        console.error('Error en DELETE región:', error.message);
        throw error;
    }
}

// ============ CIUDADES ============
const getCiudades = async() => {
    try {
        const respuesta = await fetch(`${URL_API}ciudades`);
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            return datos;
        } else {
            console.log('Error al obtener ciudades');
            return [];
        } 
    } catch(error){
        console.log(error);
        return [];
    }
}

const postCiudad = async (datos) => {
    try {
        const response = await fetch(`${URL_API}ciudades`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en POST ciudad:', error.message);
        throw error;
    }
}

const patchCiudad = async (datos, id) => {
    try {
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        return await response.json();
    } catch (error) {
        console.error('Error en PATCH ciudad:', error.message);
        throw error;
    }
}

const deleteCiudad = async (id) => {
    try {
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        return await response.json();
    } catch (error) {
        console.error('Error en DELETE ciudad:', error.message);
        throw error;
    }
}

// Exportar todas las funciones
export {
    // Países
    getPaises,
    postPais,
    patchPais,
    deletePais,
    // Regiones
    getRegiones,
    postRegion,
    patchRegion,
    deleteRegion,
    // Ciudades
    getCiudades,
    postCiudad,
    patchCiudad,
    deleteCiudad
};