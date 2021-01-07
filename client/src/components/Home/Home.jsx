import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/appContext";
import { SET_ALL_MUSICS } from "../../constant/actionTypes";
import { API } from "../../config/api";

import { Container, Grid } from "@material-ui/core";

import Carousel from "./Carousel/Carousel";
import CardList from "./CardList/CardList";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Loading from "../Loading/Loading";

import makeStyles from "./style";
function Home() {
  const [state, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const { musics } = state;
  // Music player
  const [playIndex, setPlayIndex] = useState(0);
  const { playlist } = state;
  const classes = makeStyles();

  const fetchMusics = async () => {
    try {
      setLoading(true);
      const response = await API("/musics");
      dispatch({
        type: SET_ALL_MUSICS,
        payload: {
          musics: response.data.data.musics,
        },
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMusics();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.mainContainer}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <Carousel />
              </Grid>
              <Grid
                container
                justify="center"
                alignItems="stretch"
                spacing={3}
                item
                lg={12}
                md={12}
              >
                <CardList musics={musics} />
              </Grid>
              <Grid container>
                <Grid item style={{ width: "100%" }}>
                  {/* {state.playlist.length > 0 ? (<MusicPlayer />) : (<div></div>)} */}
                  <MusicPlayer
                    playlist={playlist}
                    playIndex={playIndex}
                    setPlayIndex={setPlayIndex}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
}

export default Home;
