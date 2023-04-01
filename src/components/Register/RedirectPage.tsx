import React, { useEffect } from "react";
import  { Navigate } from 'react-router-dom'
import { useEmailVerificationMutation, useSaveUserQuery } from "../../app/services/auth-api";

const RedirectPage = () => {
  const {} = useSaveUserQuery();
  const [sendEmailVerification] = useEmailVerificationMutation({});

  useEffect(()=>{
    sendEmailVerification({})
  },[])
  
  return (
    <Navigate to='/job'  />
  );
};

export default RedirectPage;
