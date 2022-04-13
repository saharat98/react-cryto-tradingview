import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Style/Coinpage.css";
import { useNavigate } from "react-router-dom";

import Pagination from "@material-ui/lab/Pagination";
import {
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
} from "@material-ui/core";

function CoinPage() {
  const history = useNavigate();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const rp = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setCoins(rp.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  const SearchCoin = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.name.toUpperCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search) ||
        coin.symbol.toUpperCase().includes(search)
    );
  };

  return (
    <>
      <div>
        <Container className="pageCenter">
          <h1 style={{ margin: "18" }}>Cryptocurrency Prices</h1>
          <TextField
            className="textFieldstyle"
            label="Search For a Crypto Currency.."
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress className="loading" />
            ) : (
              <Table>
                <TableHead className="tableheadStyle">
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          className="tablecellStyle"
                          key={head}
                          align={head === "Coin" ? "inherit" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SearchCoin()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const coinProfit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          className="tableRow"
                          onClick={() => history(`coins/${row.id}`)}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              display: "flex",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                  color: "white",
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span style={{ color: "#353535" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            <span>
                              $
                              {row.current_price.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: coinProfit > 0 ? "#009100" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {coinProfit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right" style={{ color: "white" }}>
                            $
                            {row.market_cap.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {/* // page from mui // */}
          <Pagination
            count={parseInt((SearchCoin().length / 10).toFixed(0))}
            color="primary"
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </div>
    </>
  );
}

export default CoinPage;
