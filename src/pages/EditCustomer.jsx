import { getCustomer , updateCustomer} from "../../data/customers";
import {  Form as FormReact, useNavigate, useLoaderData, useActionData,redirect} from "react-router-dom"
import Form from "../components/Form";
import Error from "../components/Error";

export const loader = async ({ params }) => {
    
    const customer = await getCustomer(params.customerId); 
    if (Object.values(customer).length === 0) {
        throw new Response('', {
            status: 404, 
            
        })
    }

    
    return customer;
    
}

export const action = async ({ request, params }) => {
    const formData = await request.formData();

    

    const data = Object.fromEntries(formData)

    const email= formData.get('email')


    //validacion 
    console.log(data)
    const errors = [];
    if (Object.values(data).includes('')) {
        errors.push('All fields are mandatory'); 
        
    }
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if (!regex.test(email)) {
        errors.push('Email is not valid!');
    }

    //return if there are mistakes
    if (Object.keys(errors).length) {
        return errors
    }

    //console.error(errors);

    //Update customer
     await updateCustomer(params.customerId,data)



    return redirect('/');
    
}
const EditCustomer = () => {
    const navigate = useNavigate();
    const customer = useLoaderData();
    const errors = useActionData(); 

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
        <p className="mt-3 ">You can modify customer's information</p>
        
        <div className="flex justify-end">
            <button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
              onClick={()=>navigate(-1)}
            > 
                Return
            </button>
            
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
             {errors?.length && errors.map((error, i) => <Error key={i}>{ error}</Error>)}
            <FormReact
                method='POST'
                noValidate
               
                
            >
                  <Form
                      customer={customer}
                  />
            
            <input
                type="submit"
                className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                value="Add Customer"
                />
              </FormReact>
        </div>

        
    </>
  )
}

export default EditCustomer
