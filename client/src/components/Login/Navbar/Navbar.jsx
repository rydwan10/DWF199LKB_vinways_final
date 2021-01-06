import navIcon from "../../../assets/navIcon.svg";
import makeStyles from "./style";

function Navbar() {
  const classes = makeStyles();

  return (
    <nav className={classes.navbar}>
      <img src={navIcon} alt="Navigation Bar Icon" height="30" />
    </nav>
  );
}

export default Navbar;
