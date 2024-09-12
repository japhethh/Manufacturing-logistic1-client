import file1 from "../assets/file1.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center mx-auto bg-white w-full h-screen justify-center">
      <img src={file1} alt="/" className="w-[500px]" />
      <div className="grid gap-2">
        <p className="font-Fredericka-the-Great text-3xl text-black">
          NOT FOUND
        </p>
        <Link to={"/"}>
          <button className="border border-black/80 text-black/80 hover:bg-black/20 duration-200 w-full py-2 px-5 rounded-lg">
            HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
