import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";

import {
  Container,
  Grid,
  Avatar,
  Menu,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { AppContext } from "../../context/appContext";
import { LOGOUT } from "../../constant/actionTypes";

// icons
import navIcon from "../../assets/navIcon.svg";
import rydwan from "../../assets/dw-profile-picture.png";
import addmusic from "../../assets/icons/addmusic.svg";
import addartist from "../../assets/icons/addartist.svg";
import logout from "../../assets/icons/logout.svg";
import pay from "../../assets/icons/pay.svg";
import trash from "../../assets/icons/trash.svg";

import MenuItem from "@material-ui/core/MenuItem";

import Loading from "../Loading/Loading";

import makeStyles from "./style";

function Navbar() {
  const StyledMenu = withStyles({
    paper: {
      backgroundColor: "#363954",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  const classes = makeStyles();

  // eslint-disable-next-line
  const [state, dispatch] = useContext(AppContext);

  const splitName = state.user.name.split(" ");
  const name = splitName[0];
  // const name = "not loaded";

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: LOGOUT });
  };

  // Dialog Component

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  function DeleteAccountDialog() {
    // eslint-disable-next-line

    const handleClose = () => {
      setOpenDialog(false);
    };

    const handleDeleteAccount = async () => {
      try {
        const response = await API.delete("/delete-account");
        if (response.status === 200) {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <>
        <Dialog open={openDialog}>
          <DialogTitle>{"Delete Your Account?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {
                "Your account will deleted permanently and it can't be restored!"
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleDeleteAccount();
                handleClose();
              }}
              variant="contained"
              color="primary"
            >
              Yes
            </Button>
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  // End of Dialog Component

  return state.isLoading || state.user === [] ? (
    <Loading />
  ) : state.isLogin ? (
    <nav className={classes.navbar}>
      <DeleteAccountDialog />
      <Container>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Link to="/">
              <img src={navIcon} alt="Navigation Bar Icon" height="30" />
            </Link>
          </Grid>
          <Grid
            style={{ width: "25%" }}
            item
            container
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <div>
                <Typography
                  style={{
                    color: "white",
                    fontFamily: "Nunito",
                    fontSize: "1.2rem",
                  }}
                >
                  {state.isLoading ? null : (
                    <>
                      <span style={{ color: "#03F387" }}>Hello,</span> {name}
                    </>
                  )}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Avatar
                onClick={handleClick}
                className={classes.bgAvatar}
                src={rydwan}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {state.user.role === "admin" ? (
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link className={classes.link} to="/add-music">
            <MenuItem
              style={{ color: "#ffffff", fontFamily: "Nunito" }}
              onClick={handleClose}
            >
              <img
                style={{ marginRight: "12px" }}
                src={addmusic}
                alt="icon"
                width="25px"
              />
              Add Music
            </MenuItem>
          </Link>
          <Link className={classes.link} to="/add-artist">
            <MenuItem
              style={{ color: "#ffffff", fontFamily: "Nunito" }}
              onClick={handleClose}
            >
              <img
                style={{ marginRight: "12px" }}
                src={addartist}
                alt="icon"
                width="25px"
              />
              Add Artist
            </MenuItem>
          </Link>
          <Link className={classes.link} to="/transactions">
            <MenuItem
              style={{ color: "#ffffff", fontFamily: "Nunito" }}
              onClick={handleClose}
            >
              <img
                style={{ marginRight: "12px" }}
                src={pay}
                alt="icon"
                width="25px"
              />
              Transactions
            </MenuItem>
          </Link>
          <MenuItem
            style={{ color: "#ffffff", fontFamily: "Nunito" }}
            onClick={handleLogout}
          >
            <img
              style={{ marginRight: "12px" }}
              src={logout}
              alt="icon"
              width="25px"
            />
            Logout
          </MenuItem>
        </StyledMenu>
      ) : (
        <StyledMenu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link className={classes.link} to="/pay">
            <MenuItem
              style={{ color: "#ffffff", fontFamily: "Nunito" }}
              onClick={handleClose}
            >
              <img
                style={{ marginRight: "12px" }}
                src={pay}
                alt="icon"
                width="25px"
              />
              Pay
            </MenuItem>
          </Link>

          {/* <Link className={classes.link} to="/pay"> */}
          <MenuItem
            style={{ color: "red", fontFamily: "Nunito", fontWeight: "bold" }}
            onClick={() => {
              handleClose();
              setOpenDialog(true);
            }}
          >
            <img
              style={{ marginRight: "12px" }}
              src={trash}
              alt="icon"
              width="28px"
            />
            Delete Account
          </MenuItem>
          {/* </Link> */}

          <MenuItem
            style={{ color: "#ffffff", fontFamily: "Nunito" }}
            onClick={handleLogout}
          >
            <img
              style={{ marginRight: "12px" }}
              src={logout}
              alt="icon"
              width="25px"
            />
            Logout
          </MenuItem>
        </StyledMenu>
      )}
    </nav>
  ) : (
    <div></div>
  );
}

export default Navbar;
