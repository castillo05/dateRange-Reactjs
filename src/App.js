import logo from "./logo.svg";
import "./App.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const getOrders = async (start, end) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/order?dateStarted=${start}&dateEnded=${end}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1NZkRRWS15bVROWjBHVVZzeVU0IiwiZW1haWwiOiJqdWxpYW5hLm1nM0BnbWFpbC5jb20iLCJuYW1lIjoianVsaWFuYSIsImlhdCI6MTYyNzU3NjA2NywiZXhwIjoxNjI3NTg2ODY3fQ.bjovwyjqT3GEKf2-_zPzfjQxKGK5cYMy4Zu-S1uXXLY",
          },
        }
      );

      console.log(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    const start = moment(ranges.selection.startDate).format("YYYY-MM-DD");
    const end = moment(ranges.selection.endDate).format("YYYY-MM-DD");
    console.log(ranges);
    getOrders(start, end);
  };
  return (
    <div className="App">
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        rangeColors={["#67BC87"]}
      />
    </div>
  );
}

export default App;
