const getCustomers = async () => {
   
    
    const response = await fetch(import.meta.env.VITE_API_URL);
    
    const result = await response.json();
    
    return result;
};

const getCustomer = async (id) => {
   
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    
    const result = await response.json();
    
    return result;
};



const addCustomer = async (data) => {
    console.log(data)

    try {
        const response = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
            
        })
        await response.json();
        
    } catch (error) {
        console.log(error)
    }
    return {}
    
};


const updateCustomer = async (id, data) => {
    
    console.log(data)

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
            
        })
        await response.json();
        
    } catch (error) {
        console.log(error)
    }
    return {}
}
const deleteCustomer = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
           
          
            
        })
        await response.json();
        
    } catch (error) {
        console.log(error)
    }
    return {}
    
}

export { getCustomers, addCustomer, getCustomer, updateCustomer, deleteCustomer};