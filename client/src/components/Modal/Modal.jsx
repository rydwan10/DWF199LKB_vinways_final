import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { SET_MODAL } from "../../constant/actionTypes";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#191C35",
    color: "#469F74",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function ModalBox() {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  const handleClose = () => {
    dispatch({ type: SET_MODAL, payload: { isOpen: false, message: null } });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={state.isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state.isModalOpen}>
          <div className={classes.paper}>
            <h3 style={{ fontWeight: "semi-bold" }} id="transition-modal-title">
              {state.modalMessage}
            </h3>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalBox;
