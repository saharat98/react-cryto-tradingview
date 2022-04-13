import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Style/Coindetail.css";
import { LinearProgress } from "@material-ui/core";
import Coinchart from "./Coinchart";

function Coindetail() {
  const [coin, setCoin] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchCoin = async (id) => {
    setLoading(true);
    const rp = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoin(rp.data);
    setLoading(false);
    console.log(rp.data);
  };

  useEffect(() => {
    
    fetchCoin(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <LinearProgress style={{ backgroundColor: "#F2FC2B" }} />
      ) : (
        <>
          <div className="Banner">
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              className="imgSpin"
            ></img>
            <h1>{coin?.name}</h1>
            <span style={{ fontSize: "25px" }}>
              Price $
              {coin?.market_data.current_price["usd"].toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 2,
                }
              )}
            </span>
            <Coinchart />
          </div>
        </>
      )}
    </>
  );
}

export default Coindetail;
