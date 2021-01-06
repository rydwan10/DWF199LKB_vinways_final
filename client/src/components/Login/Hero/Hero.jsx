import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

import heroIcon from "../../../assets/heroIcon.svg";

import makeStyles from "./style";
function Hero() {
  const classes = makeStyles();

  return (
    <>
      <Typography variant="h3" className={classes.heroTitle}>
        Listening is
      </Typography>
      <div className={classes.hero2Wrapper}>
        <span>
          <img className={classes.heroImage} src={heroIcon} alt="Hero Icon" />
        </span>
        <Typography variant="h3" className={classes.heroTitle2}>
          Everything
        </Typography>
      </div>
      <span className={classes.tinyHero}>
        <p>pay and access milions of songs</p>
      </span>
      <Link className={classes.link} to="/register">
        <Button
          size="medium"
          variant="contained"
          className={classes.registerButton}
        >
          Register
        </Button>
      </Link>
    </>
  );
}

export default Hero;
