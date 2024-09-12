import file1 from "../assets/file1.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-screen px-4">
      <img src={file1} alt="Not Found" className="w-[300px] md:w-[500px] mb-6" />
      <div className="text-center">
        <p className="font-Fredericka-the-Great text-4xl md:text-5xl text-black mb-4">
          Page Not Found
        </p>
        <Link to={"/"}>
          <button className="border border-black/80 text-black/80 hover:bg-black/10 transition duration-200 ease-in-out w-full md:w-auto py-2 px-6 rounded-lg">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
