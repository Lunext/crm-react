import { useNavigate, Form as FormReact, redirect } from "react-router-dom";
import { deleteCustomer } from "../../data/customers";

export const action =async ({ params }) => {
    await deleteCustomer(params.customerId)
    return redirect('/')
    
}
const Customer = ({ customer }) => {
    const navigate = useNavigate();
    
    const { name,company, email,phone, id} = customer; 
  return (
    <tr className="border-b">
    <td className='p-6 space-y-2'>
              <p className="text-2xl text-gray-800">{name}</p>
              <p >{company}</p>

          </td>
          <td className="p-6">
              <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: {''}</span>{email}</p>
              <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Phone: {''}</span>{phone}</p>
              
          </td>

          <td className="p-6 flex gap-3">
              <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                  onClick={()=>navigate(`/customers/${id}/edit`)}
              >
                  Edit Customer
                  
              </button>
              <FormReact
                  method="POST"
                  action={`/customers/${id}/delete`}
                  onSubmit={(e) => {
                      if (!confirm('Do you want to delete it?')) {
                          e.preventDefault()
                      }
                      
                  }}
              >
              <button
                  type="submit"
                  className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
              >Delete</button>
                  
              </FormReact>
            
          </td>

          
  </tr>
  )
}

export default Customer
