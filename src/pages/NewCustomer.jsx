import { useNavigate, Form as FormReact, useActionData, redirect } from "react-router-dom"
import Form from "../components/Form";
import Error from "../components/Error";
import { addCustomer } from "../../data/customers";
export const action = async ({ request }) => {
    

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
    await addCustomer(data)



    return redirect('/');
}
const NewCustomer = () => {

    const errors=useActionData()
    const navigate = useNavigate(); 
    
  return (
      <div>
          <>
          <h1 className="font-black text-4xl text-blue-900">New Customer</h1>
              <p className="mt-3 ">Fill all fields to add a new customer</p>
              
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
                  <Form />
                  
                  <input
                      type="submit"
                      className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
                      value="Add Customer"
                      />
                    </FormReact>
              </div>

              
          </>
      
    </div>
  )
}

export default NewCustomer
