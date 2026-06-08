const APPS_SCRIPT_URL =https://script.google.com/macros/s/AKfycbwbGS5jK1OGHvQtt68YJnYaGsC1Fp0gTcC2zOCkMLzVVuWCAU1n-8nZHl-CI8TCI5pGPA/exec
'YOUR_APPS_SCRIPT_URL';

function parseJwt(token) {

  const base64Url = token.split('.')[1];

  const base64 = base64Url
    .replace(/-/g,'+')
    .replace(/_/g,'/');

  return JSON.parse(atob(base64));
}

async function handleCredentialResponse(response){

  const user = parseJwt(response.credential);

  const payload = {
    name:user.name,
    email:user.email
  };

  const res = await fetch(
    APPS_SCRIPT_URL,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    }
  );

  const result = await res.json();

  if(result.success){

    localStorage.setItem(
      "user",
      JSON.stringify(payload)
    );

    location.href = "dashboard.html";
  }
}