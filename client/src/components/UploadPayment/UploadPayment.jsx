import { Container, Grid } from "@material-ui/core";

// importing needed components
import Form from "./Form/Form";

// style
import makeStyles from "./style";
function UploadPayment() {
  const classes = makeStyles();

  return (
    <div className={classes.mainContainer}>
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12} sm={6}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default UploadPayment;
