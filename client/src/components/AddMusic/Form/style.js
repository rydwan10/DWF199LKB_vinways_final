import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
      backgroundColor: "transparent",
      fontSize: "1.3rem",
      fontFamily: "Nunito",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    ".MuiSelect-icon": {
      color: "white",
    },
  },
  form: {
    width: "100%",
    textAlign: "left",
    color: "#FFFFFF",
    // marginTop: '2rem',
  },

  inputGroup: {
    marginBottom: ".8rem",
  },

  inputWrapper: {
    marginTop: "2rem",
  },
  inputField: {
    backgroundColor: "rgb(51 51 70 / 75%) !important",
    borderRadius: "6px",
    border: "1px solid white",
  },

  dropdownArtist: {
    backgroundColor: "rgb(51 51 70 / 75%) !important",
    color: "black !important",
    width: "100%",
    borderRadius: "6px",
    border: "1px solid white",
  },
  fileInputButton: {
    display: "flex",
    justifyContent: "space-between",
    fongSize: ".7rem",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "rgb(51 51 70 / 75%) !important",
    border: "1px solid white",
    width: "80%",
    height: "45px",
    padding: "0 24px",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "Nunito",
  },
  fileInputAudio: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45px",
    padding: "0 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontFamily: "Nunito",
    fontWeight: "bold",
    backgroundColor: "rgb(51 51 70 / 75%) !important",
    border: "1px solid white",
    width: "25rem",
  },
  selectArtist: {
    color: "black !important",
  },

  title: {
    color: "#03F387",
    fontWeight: "bold",
    marginTop: "2rem",
  },
  addMusicButton: {
    width: "50%",
    backgroundColor: "#03F387",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "Nunito",
    fontSize: "18px",
    marginTop: "2.3rem",
  },
  boldCompany: {
    fontWeight: "bold",
  },
  greenText: {
    color: "#03F387",
  },
  inputFile: {},
  "#file-upload-button": {
    padding: "24px 25px",
  },
  [theme.breakpoints.down("sm")]: {
    root: {
      "& .MuiInputBase-input": {
        color: "white",
        backgroundColor: "transparent",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "2px solid #26942b",
        width: "560px",
      },
      "& .MuiInputLabel-root": {
        display: "block",
        color: "white",
        fontWeight: "500",
      },
      "& .MuiInput-underline:before": {
        borderBottom: `2px solid black`,
        width: "0",
      },
    },
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      "& .MuiInputBase-input": {
        color: "white",
        backgroundColor: "transparent",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "2px solid #26942b",
        width: "250px",
      },
      "& .MuiInputLabel-root": {
        display: "block",
        color: "white",
        fontWeight: "500",
      },
      "& .MuiInput-underline:before": {
        borderBottom: `2px solid black`,
        width: "0",
      },
    },
  },
}));
