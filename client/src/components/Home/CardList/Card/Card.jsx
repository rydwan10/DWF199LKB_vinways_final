import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 160,
    overflow: "hidden",
    display: "inline-block",
  },
  media: {
    height: 125,
    margin: ".8rem",
  },
  textGreen: {
    color: "#03F387",
    fontFamily: "Nunito",
  },
  yearText: {
    fontSize: "14px",
    fontFamily: "Nunito",
  },
  artistText: {
    fontSize: "14px",
    fontFamily: "Nunito",
  },
  titleWrapper: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

function CardMusic({ music, handleAddToPlaylist }) {
  const classes = useStyles();

  const musicYear = music.year.split("-");

  const addToPlaylist = (music) => {
    handleAddToPlaylist(music);
  };

  return (
    <>
      <Card
        style={{
          background: "#363954",
          color: "white",
          borderRadius: "6px",
        }}
        className={classes.root}
      >
        <CardActionArea onClick={() => addToPlaylist(music)}>
          <CardMedia
            className={classes.media}
            image={`http://localhost:5000/uploads/${music.thumbnail}`}
            title={music.title}
          />
          <CardContent>
            <Grid
              className={classes.titleWrapper}
              container
              alignItems="flex-end"
              direction="column"
            >
              <Grid container item justify="space-between" alignItems="center">
                <Grid
                  item
                  style={{
                    width: "70%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Nunito",
                    }}
                  >
                    {music.title}
                  </span>
                </Grid>
                <Grid item>
                  <span
                    style={{
                      fontFamily: "Nunito",
                    }}
                  >
                    {musicYear[0]}
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                style={{
                  width: "80%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  className={`${classes.textGreen} ${classes.artistText} ${classes.titleWrapper}`}
                  variant="body1"
                >
                  {music.artist.name}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default CardMusic;
