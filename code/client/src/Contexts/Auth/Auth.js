import DOMPurify from "dompurify";

const emailAuth = (email) =>{
  const santizedValue=DOMPurify.sanitize(email);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var result=null;
  if(santizedValue===""){
    result = {email:santizedValue,error:false};
  }
  if(!regex.test(santizedValue)){
    result = {email:santizedValue,error:true};
  }
  else{
    result = {email:santizedValue,error:false};
  }
  return result;
}

const passwordAuth = (password) =>{
  const sanitizedValue = DOMPurify.sanitize(password);
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  if(regex.test(sanitizedValue)){
    return {password: sanitizedValue,error:""}
  }
  else{
    return {password: sanitizedValue,error:"Password must be at least 8 characters with numbers, symbols and letters of upper case and lower case"}
  }

}

const confirmPasswordAuth = (password,confirmPassword) =>{
  if(DOMPurify.sanitize(password)===DOMPurify.sanitize(confirmPassword)){
    return {confirmPassword:confirmPassword,error:""};
  }
  else{
    return {confirmPassword:confirmPassword,error:"Passwords do not match"};
  }
}

const userNameAuth = (username) =>{
  return DOMPurify.sanitize(username);
}

export {emailAuth,passwordAuth,confirmPasswordAuth,userNameAuth};

