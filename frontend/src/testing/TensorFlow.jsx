import { useState } from "react";
import axios from "axios";
import { apiURL } from "../context/Store";
import { toast } from "react-toastify";

const TensorFlow = () => {
  const [week, setWeek] = useState(0);
  const [data, setData] = useState([]);

  const submited = async () => {
    try {
      const response = await axios.post(`${apiURL}/api/forecast`, {
        week: Number(week),
      });
      console.log(response.data.week);
      console.log(response.data.predictedDemand);
      setData(response.data.predictedDemand);
      toast.success("Created Demand Forecasting");
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  console.log(week);
  return (
    <div className="p-5 bg-gradient-to-r from-violet-400 via-violet-200 to-violet-900">
      <div>
        <label htmlFor="week" className="label">
          Week
        </label>
        <input
          type="number"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          id="week"
          className="input"
          required
        />

        <button onClick={submited}>Submit</button>

        <div>
          <h1 className="text-2xl font-semibold text-green-500">{data}</h1>
        </div>
      </div>
    </div>
  );
};

export default TensorFlow;
