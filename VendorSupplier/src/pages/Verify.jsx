import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token and email validity
    const verifySupplier = async () => {
      try {
        const response = await axios.get(
          `https://your-backend-url.com/api/email/verify`,
          {
            params: { token, email },
          }
        );
        setIsValid(true); // If valid, display the form
      } catch (error) {
        console.error("Invalid token or email:", error);
        setIsValid(false);
      }
    };
    verifySupplier();
  }, [token, email]);

  if (!isValid) {
    return <div>Invalid or expired verification link.</div>;
  }

  return (
    <div>
      <h2>Complete Your Registration</h2>
      flasdk;jfl;aksdjfl;kadsjl;fkajds;kjfal;sdkjl;kj;lkj;klj
      {/* Include the form components here */}
    </div>
  );
};

export default Verify;
