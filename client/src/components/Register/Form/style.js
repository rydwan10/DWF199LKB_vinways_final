import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
      fontSize: "1.2rem",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
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
  form: {
    width: "100%",
  },
  loginTitle: {
    color: "#03F387",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  inputField: {
    backgroundColor: "rgb(51 51 70 / 75%) !important",
    borderRadius: "6px",
    border: "1px solid white",
    marginBottom: "6px",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#03F387",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "Nunito",
    fontSize: "18px",
    marginTop: "2.3rem",
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
