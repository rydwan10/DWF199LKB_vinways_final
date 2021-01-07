import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../context/appContext";
import { API } from "../../../config/api";
import { SET_MODAL } from "../../../constant/actionTypes";
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

import makeStyles from "./style";
import attachThumbnailIcon from "../../../assets/icons/attachThumbnail.svg";

function Form({ setFetch, editedArtistData, setEditedArtistData }) {
  const [artistCoverPreview, setArtistCoverPreview] = useState(null);
  const [category, setCategory] = useState("");
  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);
  const [input, setInput] = useState({
    name: "",
    old: "",
    category: "",
    startCareer: "",
    thumbnail: "",
    thumbnailName: "",
  });

  const handleSend = async (e) => {
    e.preventDefault();
    if (
      input.name.trim() === "" ||
      input.old.trim() === "" ||
      input.category.trim() === "" ||
      input.startCareer.trim() === "" ||
      input.thumbnail === ""
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
        const { name, old, category, startCareer, thumbnail } = input;
        const body = new FormData();
        body.append("name", name);
        body.append("old", old);
        body.append("category", category);
        body.append("startCareer", startCareer);
        body.append("thumbnail", thumbnail);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await API.post("/artists", body, config);
        if (response.status === 201) {
          setFetch((prev) => !prev);
          dispatch({
            type: SET_MODAL,
            payload: {
              isOpen: true,
              message: "Artist added successfully!",
            },
          });
          setInput({
            name: "",
            old: "",
            category: "",
            startCareer: "",
            thumbnail: "",
            thumbnailName: "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { name, old, category, startCareer, thumbnail } = input;
      const body = new FormData();
      body.append("name", name);
      body.append("old", old);
      body.append("category", category);
      body.append("startCareer", startCareer);
      body.append("thumbnail", thumbnail);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.patch(
        `/artists/${editedArtistData.id}`,
        body,
        config
      );
      if (response.status === 200) {
        setFetch((prev) => !prev);
        dispatch({
          type: SET_MODAL,
          payload: {
            isOpen: true,
            message: "Artist edited successfully!",
          },
        });
        setEditedArtistData(null);
        setInput({
          name: "",
          old: "",
          category: "",
          startCareer: "",
          thumbnail: "",
          thumbnailName: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (editedArtistData) {
      setInput({ ...editedArtistData });
      setCategory(editedArtistData.category);
    }
    // eslint-disable-next-line
  }, [editedArtistData]);

  const classes = makeStyles();
  return (
    <>
      <Modal />
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={editedArtistData ? handleEdit : handleSend}
      >
        <Typography className={classes.title} variant="h5">
          {editedArtistData
            ? `Edit Artist: ${editedArtistData.name}`
            : "Add Artist"}
        </Typography>

        <div className={classes.inputWrapper}>
          <Grid
            container
            className={classes.inputGroup}
            justify="space-between"
          >
            <Grid style={{ width: "80%" }} item>
              <TextField
                size="small"
                className={classes.inputField}
                variant="outlined"
                style={{ width: "100%" }}
                placeholder="Name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                value={input.name}
              />
            </Grid>

            <Grid style={{ width: "18%" }} item>
              <Grid style={{ width: "90%" }} item>
                <input
                  onChange={(e) => {
                    setArtistCoverPreview(
                      URL.createObjectURL(e.target.files[0])
                    );
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
                    {artistCoverPreview == null
                      ? "Attach Thumbnail"
                      : `${input.thumbnailName}`}
                    <img src={attachThumbnailIcon} alt="attachThumbnail-icon" />
                  </label>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item>
              {artistCoverPreview ? (
                <img
                  src={artistCoverPreview}
                  alt="preview"
                  width="128px"
                  style={{ marginBottom: "1rem" }}
                />
              ) : editedArtistData ? (
                <img
                  src={`http://localhost:5000/uploads/${editedArtistData.thumbnail}`}
                  alt="preview"
                  width="128px"
                  style={{ marginBottom: "1rem" }}
                />
              ) : null}
            </Grid>
          </Grid>

          <Grid container className={classes.inputGroup}>
            <Grid item sm={12} md={12}>
              <TextField
                size="small"
                className={classes.inputField}
                variant="outlined"
                style={{ width: "100%" }}
                placeholder="Old"
                onChange={(e) => setInput({ ...input, old: e.target.value })}
                value={input.old}
              />
            </Grid>
          </Grid>

          <Grid container className={classes.inputGroup}>
            <Grid item style={{ width: "100%" }}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.dropdownArtist}
              >
                <Select
                  value={category}
                  onChange={(e) => {
                    setInput({ ...input, category: e.target.value });
                    setCategory(e.target.value);
                  }}
                  className={classes.selectArtist}
                  displayEmpty
                >
                  <MenuItem disabled>Choose artist type</MenuItem>
                  <MenuItem value="Solo">Solo</MenuItem>
                  <MenuItem value="Group">Group</MenuItem>
                  <MenuItem value="Band">Band</MenuItem>
                  <MenuItem value="Indie">Indie</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            className={classes.inputGroup}
            item
            alignItems="center"
            justify="flex-start"
            sm={8}
            md={12}
          >
            <Grid style={{ width: "100%" }} item>
              <TextField
                size="small"
                type="date"
                className={classes.inputField}
                variant="outlined"
                style={{ width: "100%" }}
                placeholder="Start a Carrer"
                value={input.startCareer}
                onChange={(e) =>
                  setInput({ ...input, startCareer: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </div>

        <Grid
          container
          justify="center"
          alignContent="center"
          direction="column"
        >
          <Button
            type="submit"
            className={classes.addMusicButton}
            size="medium"
            variant="contained"
          >
            {editedArtistData ? "Edit Artist" : "Add Artist"}
          </Button>
          {editedArtistData ? (
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
                setEditedArtistData(null);
                setInput({
                  name: "",
                  old: "",
                  category: "",
                  startCareer: "",
                  thumbnail: "",
                  thumbnailName: "",
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
