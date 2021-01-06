import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/appContext";
import { SET_MODAL } from "../../../constant/actionTypes";
import { API } from "../../../config/api";
import Modal from "../../Modal/Modal";
import {
  Grid,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import attachThumbnailIcon from "../../../assets/icons/attachThumbnail.svg";
import makeStyles from "./style";

function Form({ artists, setFetching, editedMusicData, setEditedMusicData }) {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);
  // eslint-disable-next-line
  const [audio, setAudio] = useState(null);
  const [artistId, setArtistId] = useState(null);
  const [input, setInput] = useState({
    title: "",
    year: "",
    artistId: "",
    thumbnail: "",
    thumbnailName: "",
    attachment: "",
    attachmentName: "",
  });

  const handleAddMusic = async (e) => {
    e.preventDefault();
    if (
      input.title.trim() === "" ||
      input.year.trim() === "" ||
      input.artistId === "" ||
      input.thumbnail === "" ||
      input.attachment === ""
    ) {
      dispatch({
        type: SET_MODAL,
        payload: {
          isOpen: true,
          message: "All fields is required!",
        },
      });
    } else {
      try {
        const { title, year, artistId, thumbnail, attachment } = input;
        const body = new FormData();
        body.append("title", title);
        body.append("year", year);
        body.append("artistId", artistId);
        body.append("thumbnail", thumbnail);
        body.append("attachment", attachment);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await API.post("/musics", body, config);
        if (response.status === 201) {
          setFetching((prev) => !prev);
          dispatch({
            type: SET_MODAL,
            payload: {
              isOpen: true,
              message: "Music added successfully!",
            },
          });
        }
      } catch (err) {
        console.log(err.response);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { title, year, artistId, thumbnail, attachment } = input;
      const body = new FormData();
      body.append("title", title);
      body.append("year", year);
      body.append("artistId", artistId);
      body.append("thumbnail", thumbnail);
      body.append("attachment", attachment);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.patch(
        `/musics/${editedMusicData.id}`,
        body,
        config
      );

      if (response.status === 200) {
        setFetching((prev) => !prev);
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: "Music Edited successfully!",
          },
        });
        setEditedMusicData(null);
        setInput({
          title: "",
          year: "",
          artistId: "",
          thumbnail: "",
          thumbnailName: "",
          attachment: "",
          attachmentName: "",
        });
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (editedMusicData) {
      setInput({
        title: editedMusicData.title,
        year: editedMusicData.year,
        artistId: editedMusicData.artist.id,
        thumbnail: editedMusicData.thumbnail,
        thumbnailName: editedMusicData.thumbnail,
        attachment: editedMusicData.attachment,
        attachmentName: editedMusicData.attachment,
      });
      setArtistId(editedMusicData.artist.id);
    }
  }, [editedMusicData]);

  const classes = makeStyles();
  return (
    <>
      <Modal />
      <form
        onSubmit={editedMusicData ? handleEdit : handleAddMusic}
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <Typography className={classes.title} variant="h5">
          {editedMusicData
            ? `Edit Music: ${editedMusicData.title}`
            : "Add Music"}
        </Typography>

        <div className={classes.inputWrapper}>
          <Grid
            container
            className={classes.inputGroup}
            alignItems="flex-end"
            justify="space-between"
          >
            <Grid container item alignItems="center" sm={9}>
              <Grid style={{ width: "100%" }} item>
                <TextField
                  size="small"
                  className={classes.inputField}
                  variant="outlined"
                  style={{ width: "109%" }}
                  placeholder="Song Title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Grid item>
              <Grid style={{ width: "95%" }} item>
                <input
                  onChange={(e) => {
                    setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
                    setInput({
                      ...input,
                      thumbnail: e.target.files[0],
                      thumbnailName: e.target.files[0].name,
                    });
                  }}
                  accept="image/*"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="file-input-thumbnail"
                  multiple
                  type="file"
                />
                <div>
                  <label
                    htmlFor="file-input-thumbnail"
                    className={classes.fileInputButton}
                  >
                    {thumbnailPreview
                      ? `${input.thumbnailName}`
                      : "Attach Thumbnail"}
                    <img src={attachThumbnailIcon} alt="attachThumbnail-icon" />
                  </label>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              {thumbnailPreview ? (
                <img
                  style={{ marginBottom: "1rem" }}
                  src={thumbnailPreview}
                  alt="preview"
                  width="128px"
                />
              ) : editedMusicData ? (
                <img
                  style={{ marginBottom: "1rem" }}
                  src={`http://localhost:5000/uploads/${editedMusicData.thumbnail}`}
                  alt="preview"
                  width="128px"
                />
              ) : null}
            </Grid>
          </Grid>

          <Grid container className={classes.inputGroup}>
            <Grid
              container
              item
              alignItems="center"
              justify="flex-start"
              sm={12}
            >
              <Grid style={{ width: "100%" }} item>
                <TextField
                  size="small"
                  className={classes.inputField}
                  variant="outlined"
                  style={{ width: "100%" }}
                  placeholder="Year"
                  type="date"
                  value={input.year}
                  onChange={(e) => setInput({ ...input, year: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={classes.inputGroup} alignItems="center">
            <Grid style={{ width: "100%" }} item>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.dropdownArtist}
              >
                <Select
                  value={artistId}
                  className={classes.selectArtist}
                  onChange={(e) => {
                    setInput({ ...input, artistId: e.target.value });
                    setArtistId(e.target.value);
                  }}
                  displayEmpty
                >
                  {!artists.length ? (
                    <MenuItem value="">No artists</MenuItem>
                  ) : (
                    artists.map((artist) => (
                      <MenuItem value={artist.id}>{artist.name}</MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container>
            <Grid style={{ width: "100%" }} item>
              <input
                onChange={(e) => {
                  setAudio(URL.createObjectURL(e.target.files[0]));
                  setInput({
                    ...input,
                    attachment: e.target.files[0],
                    attachmentName: e.target.files[0].name,
                  });
                }}
                className={classes.input}
                style={{ display: "none" }}
                id="file-input-audio"
                multiple
                type="file"
              />
              <div>
                <label
                  htmlFor="file-input-audio"
                  className={classes.fileInputAudio}
                >
                  {editedMusicData
                    ? editedMusicData.attachment
                    : audio
                    ? input.attachmentName
                    : input.attachment === ""
                    ? "Attach Audio"
                    : input.attachmentName}
                </label>
              </div>
            </Grid>
          </Grid>
        </div>

        <Grid container justify="center" direction="column" alignItems="center">
          <Button
            className={classes.addMusicButton}
            size="medium"
            variant="contained"
            type="submit"
          >
            {editedMusicData ? "Edit Music" : "Add Music"}
          </Button>
          {editedMusicData ? (
            <Button
              type="button"
              className={classes.addMusicButton}
              style={{
                background: "red",
                color: "white",
                display: "block",
              }}
              size="medium"
              variant="contained"
              onClick={() => {
                setEditedMusicData(null);
                setInput({
                  title: "",
                  year: "",
                  artistId: "",
                  thumbnail: "",
                  thumbnailName: "",
                  attachment: "",
                  attachmentName: "",
                });
              }}
            >
              Cancel
            </Button>
          ) : null}
        </Grid>
      </form>
    </>
  );
}

export default Form;
