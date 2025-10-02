// Configuración para JSON Server local
const URL_API = "http://localhost:3009/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

// ============ PAÍSES ============
const getPaises = async() => {
    try {
        const respuesta = await fetch(`${URL_API}paises`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Países obtenidos:', datos);
            return datos;
        } else {
            console.error('Error al obtener países:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getPaises:', error);
        return [];
    }
}

const postPais = async (datos) => {
    try {
        console.log('Enviando país:', datos);
        const response = await fetch(`${URL_API}paises`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País guardado exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST país:', error);
        throw error;
    }
}

const patchPais = async (datos, id) => {
    try {
        console.log('Actualizando país:', id, datos);
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País actualizado:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH país:', error);
        throw error;
    }
}

const deletePais = async (id) => {
    try {
        console.log('Eliminando país:', id);
        const response = await fetch(`${URL_API}paises/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('País eliminado:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE país:', error);
        throw error;
    }
}

// ============ REGIONES ============
const getRegiones = async() => {
    try {
        const respuesta = await fetch(`${URL_API}regiones`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Regiones obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener regiones:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getRegiones:', error);
        return [];
    }
}

const postRegion = async (datos) => {
    try {
        console.log('Enviando región:', datos);
        const response = await fetch(`${URL_API}regiones`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST región:', error);
        throw error;
    }
}

const patchRegion = async (datos, id) => {
    try {
        console.log('Actualizando región:', id, datos);
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH región:', error);
        throw error;
    }
}

const deleteRegion = async (id) => {
    try {
        console.log('Eliminando región:', id);
        const response = await fetch(`${URL_API}regiones/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Región eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE región:', error);
        throw error;
    }
}

// ============ CIUDADES ============
const getCiudades = async() => {
    try {
        const respuesta = await fetch(`${URL_API}ciudades`);
        if(respuesta.ok){
            const datos = await respuesta.json();
            console.log('Ciudades obtenidas:', datos);
            return datos;
        } else {
            console.error('Error al obtener ciudades:', respuesta.status);
            return [];
        } 
    } catch(error){
        console.error('Error en getCiudades:', error);
        return [];
    }
}

const postCiudad = async (datos) => {
    try {
        console.log('Enviando ciudad:', datos);
        const response = await fetch(`${URL_API}ciudades`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad guardada exitosamente:', data);
        return data;
    } catch (error) {
        console.error('Error en POST ciudad:', error);
        throw error;
    }
}

const patchCiudad = async (datos, id) => {
    try {
        console.log('Actualizando ciudad:', id, datos);
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad actualizada:', data);
        return data;
    } catch (error) {
        console.error('Error en PATCH ciudad:', error);
        throw error;
    }
}

const deleteCiudad = async (id) => {
    try {
        console.log('Eliminando ciudad:', id);
        const response = await fetch(`${URL_API}ciudades/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Ciudad eliminada:', data);
        return data;
    } catch (error) {
        console.error('Error en DELETE ciudad:', error);
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