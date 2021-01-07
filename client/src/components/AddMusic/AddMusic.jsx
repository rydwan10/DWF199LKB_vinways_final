import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { API } from "../../config/api";
import { SET_ALL_MUSICS, SET_MODAL } from "../../constant/actionTypes";

import {
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import Form from "./Form/Form";
import MusicTable from "./Table/MusicTable";
import Loading from "../Loading/Loading";
import Modal from "../Modal/Modal";

import makeStyles from "./style";
function AddMusic() {
  const [state, dispatch] = useContext(AppContext);
  const [artists, setArtists] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [musicId, setMusicId] = useState(null);
  const [open, setOpen] = useState(false);

  const [editedMusicData, setEditedMusicData] = useState(null);

  const { musics } = state;

  // Modal Dialog
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
              {`Delete Music with id: ${musicId}?`}
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
  // End of modal dialog

  const fetchMusics = async () => {
    try {
      setLoading(true);
      const response = await API("/musics");
      if (response.status === 200) {
        dispatch({
          type: SET_ALL_MUSICS,
          payload: {
            musics: response.data.data.musics,
          },
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDelete = (id) => {
    setMusicId(id);
    setOpen(true);
  };

  const handleDeleteAfter = async () => {
    try {
      setLoading(true);
      const response = await API.delete(`/musics/${musicId}`);
      console.log(response);
      if (response.status === 200) {
        setOpen(false);
        setLoading(false);
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: "Music deleted successfully!",
          },
        });
      }
      setFetching((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (editedMusic) => {
    setEditedMusicData({ ...editedMusic });
  };

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const response = await API("/artists");
      if (response.data) {
        setArtists(response.data.data.artists);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchMusics();
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
              artists={artists}
              setFetching={setFetching}
              editedMusicData={editedMusicData}
              setEditedMusicData={setEditedMusicData}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <MusicTable
              musics={musics}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddMusic;
