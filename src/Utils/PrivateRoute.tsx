import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from './URLs/axios.index';

const PrivateRoute = ({children}:any) => {
  const [authenticated, setAuth] = useState(false)

    const navigate=useNavigate()
    useEffect(() => {
        const response =   apiCall({
            name: "getCurrentLogin",
            action: (): any => (["skip"]),
            errorAction: (): any => (navigate("/", {state: 'notAuthenticated'}),["skip"])
          })
      
          response.then( res => {
            setAuth(true)
          }).catch((err)=>{
            console.error(err)
          })
      
    })

    if(authenticated) return children
}

export default PrivateRoute