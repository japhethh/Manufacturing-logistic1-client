import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../context/Store";
import { decryptObject } from "../../../backend/testing/cryptoTesting";
const TestingCrypto = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchDecryptedData();
  }, []);

  const fetchDecryptedData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/user/testingGetAllUsersEncrypt`
      );

      const decrypted = response.data?.map((items) => decryptObject(items));

      setData(decrypted);
      console.log(decrypted);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {data?.map((item, index) => (
        <div key={index}>
          <p>{item?.email}</p>
        </div>
      ))}
    </div>
  );
};

export default TestingCrypto;
