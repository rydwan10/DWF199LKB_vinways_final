import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { API } from "../../config/api";
import { SET_ALL_ARTISTS, SET_MODAL } from "../../constant/actionTypes";
import {
  Container,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Loading from "../Loading/Loading";

import Form from "./Form/Form";

// import Dialog from "../Dialog/Dialog";
import Modal from "../Modal/Modal";

import makeStyles from "./style";
import ArtistTable from "./Table/ArtistTable";

function AddArtist() {
  const [state, dispatch] = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artistId, setArtistId] = useState(null);
  // Modal
  const [open, setOpen] = useState(false);
  // Editing state
  const [editedArtistData, setEditedArtistData] = useState(null);
  const { artists } = state;

  // Dialog Component
  const ModalDialog = () => {
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Delete Artist with id: ${artistId}?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteAfter}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  // End dialog component

  const fetchArtists = async () => {
    try {
      setLoading(true);

      const response = await API("/artists");

      dispatch({
        type: SET_ALL_ARTISTS,
        payload: {
          artists: response.data.data.artists,
        },
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    setArtistId(id);
    setOpen(true);
  };

  const handleDeleteAfter = async () => {
    try {
      setLoading(true);
      const response = await API.delete(`/artists/${artistId}`);
      setOpen(false);
      if (response.status === 200) {
        setLoading(false);
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: "Artist deleted successfully!",
          },
        });
      }
      setFetching((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (editedArtist) => {
    setEditedArtistData({ ...editedArtist });
  };
  useEffect(() => {
    fetchArtists();
    // eslint-disable-next-line
  }, [fetching]);

  const classes = makeStyles();
  return loading ? (
    <Loading />
  ) : (
    <div className={classes.mainContainer}>
      <Modal />
      <ModalDialog />
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={12}>
            <Form
              setFetch={setFetching}
              editedArtistData={editedArtistData}
              setEditedArtistData={setEditedArtistData}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ArtistTable
              artists={artists}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddArtist;
