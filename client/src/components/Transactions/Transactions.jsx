import { useEffect, useContext, useState } from "react";
import { SET_ALL_TRANSACTIONS, SET_MODAL } from "../../constant/actionTypes";
import { AppContext } from "../../context/appContext";
import { Container, Grid, Typography } from "@material-ui/core";
import { API } from "../../config/api";
import Modal from "../Modal/Modal";
import TransactionTable from "./TransactionTable/TransactionTable";

import makeStyles from "./style";
function Transactions() {
  const [state, dispatch] = useContext(AppContext);
  const [fetch, setFetch] = useState(false);
  const { transactions } = state;

  const classes = makeStyles();

  const getAllTransactions = async () => {
    try {
      const response = await API("/transactions");
      dispatch({
        type: SET_ALL_TRANSACTIONS,
        payload: {
          transactions: response.data.data.transactions,
        },
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await API.patch(`/transactions/${id}`);
      if (response.status === 200) {
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: `Transaction with id: ${id} approved!`,
          },
        });
      }
      setFetch((prev) => !prev);
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_MODAL,
        payload: {
          isOpen: true,
          message: err.response.data.message,
        },
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await API.patch(`/transactions/cancel/${id}`);
      if (response.status === 200) {
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: `Transaction with id: ${id} canceled!`,
          },
        });
      }
      setFetch((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [fetch]);

  return (
    <div className={classes.mainContainer}>
      <Modal />
      <Container maxWidth="lg">
        <Typography className={classes.title} variant="h4">
          Transaction List
        </Typography>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={12}>
            <TransactionTable
              transactions={transactions}
              handleApprove={handleApprove}
              handleCancel={handleCancel}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Transactions;
