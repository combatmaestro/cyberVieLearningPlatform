import {React,useEffect} from 'react'
import { Card,CardContent } from '@material-ui/core'

import ModuleAccordin from './ModuleAccordin'
import { useDispatch, useSelector } from "react-redux";
import {getModuleDetailsComplete } from "../../actions/moduleAction";
import Loader from '../Loader/Loader';
const ModulesDataRender = () => {
    const dispatch = useDispatch();
    const modules = useSelector((state) => state.modules);
    const userData = useSelector((state) => state.user);
    const user = userData.data
    const { loading, moduleDetails = [], error } = modules;

      useEffect(() => {
        dispatch(getModuleDetailsComplete(userData.data))
      }, [dispatch]);


      
       if (loading) return <Loader />

  return (
   <>
     <Card style={{margin:"10px",borderRadius:"10px"}} >
        <CardContent>
            {   user.role == "user" && user.tier == "free" ? 
                moduleDetails.map((module) => (

                  module.moduleTitle === "Prerequisite for Cybersecurity" && 
                    <ModuleAccordin 
                      module={module}
                    />
                ) ) : 
                  moduleDetails.map((module) => (
                    <ModuleAccordin 
                      module={module}
                    />
                ) )
            }
           
        </CardContent>
     </Card>
   </>
  )
}

export default ModulesDataRender