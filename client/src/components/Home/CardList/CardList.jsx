import React, { useContext } from "react";
import { AppContext } from "../../../context/appContext";
import { ADD_TO_PLAYLIST, SET_MODAL } from "../../../constant/actionTypes";
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Card from "./Card/Card";
import Modal from "../../Modal/Modal";
import "./style.css";

function CardList({ musics }) {
  const [state, dispatch] = useContext(AppContext);
  const router = useHistory();
  const handleAddToPlaylist = (music) => {
    if (state.user.status === "active" || state.user.role === "admin") {
      dispatch({ type: ADD_TO_PLAYLIST, payload: { music: music } });
    } else if (state.user.status === "not active") {
      dispatch({
        type: SET_MODAL,
        payload: {
          isOpen: true,
          message: "To continue please complete the payment",
        },
      });
      setTimeout(() => {
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: false,
            message: "",
          },
        });
        router.push("/pay");
      }, 2000);
    }
  };
  return (
    <>
      <Modal />
      <Grid
        spacing={3}
        container
        justify="center"
        style={{ marginTop: "1rem" }}
      >
        {!musics.length ? (
          <div sytle={{ fontFamily: "Nunito" }}>
            <span style={{ color: "rgb(3, 243, 135)", fontSize: "2.3rem" }}>
              There is no musics...
            </span>
          </div>
        ) : (
          musics.map((music) => {
            return (
              <Grid item key={music.id}>
                <Card music={music} handleAddToPlaylist={handleAddToPlaylist} />
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}

export default CardList;
