import React from 'react';

export default function GoogleLoginButton(){
  return (
    <a 
      href="http://localhost:5000/api/auth/google" 
      className="btn btn-outline btn-info w-full"
    >
      Continue with Google
    </a>
  );
}
