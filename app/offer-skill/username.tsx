import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

type DecodedToken = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

function UserName() {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<DecodedToken>(token);
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  return (
    <>
      {decodedToken ? <p>{decodedToken.username}!</p> : <p>Loading...</p>}
    </>
  );
}

export default UserName;
