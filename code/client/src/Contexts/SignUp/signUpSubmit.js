const handleSignUp = async (url,user) =>{
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (!response.ok) {
    return json.error;
  } else {
    return "";
  }
}

const handleGoogleSignUp = async() =>{
  await fetch("api/signup/google")
  .then((result)=>{
    console.log(result);
    window.location.href=result.url;
  })
}

export{
  handleSignUp,
  handleGoogleSignUp
}