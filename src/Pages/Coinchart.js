import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, styled } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import "./Style/Coinchart.css";
import { Chart as ChartJS } from "chart.js/auto";
import Button from "@mui/material/Button";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #A7CEE1 30%, #bfd7e3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #636465",
  color: "white",
  height: 48,
  padding: "0 30px",
});

function Coincart() {
  const [coinChart, setcoinCart] = useState();
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  const { id } = useParams();

  const fetchCoinchart = async () => {
    setLoading(true);

    const coincart = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );

    setcoinCart(coincart.data["prices"]);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinchart();
  }, [id, days]);

  return (
    <>
      <div className="chartDetail">
        {!coinChart | (loading === true) ? (
          <CircularProgress size={250} style={{ color: "#a9835a" }} />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <div className="chartDetail">
                <Line
                  data={{
                    labels: coinChart.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                          : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: coinChart.map((coin) => coin[1]),
                        label: `Price ( Past ${days} Days ) in USD `,
                        borderColor: "#EEBC1D",
                      },
                    ],
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  {chartDays.map((day) => (
                    <MyButton
                      key={day.value}
                      onClick={() => {
                        setDays(day.value);
                        setLoading(false);
                      }}
                      selected={day.value === days}
                    >
                      {day.label}
                    </MyButton>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Coincart;
