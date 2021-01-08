import { Box, Card, Grid, Typography } from "@material-ui/core";

const Home = (props) => {
  return (
    <Box mt={10} mb={5}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <Box mt={2}>
            <Card>
              <Box m={2}>
                <Box mb={5}>
                  <Typography variant="h1" color="primary">
                    Adopt Adopt
                  </Typography>
                  <Typography>
                    A website made by volunteers to easy the proccess of
                    adopting a pet and saving a life.
                  </Typography>
                </Box>
                {props.user ? (
                  <Box>
                    <Typography>
                      Hello, {props.user.firstName} {props.user.lastName},
                    </Typography>
                    <Typography paragraph>
                      Thanks for joining Adopt Adopt, we would make sure that
                      you would find the perfect match for you.
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}

                <Typography paragraph>
                  On our website, you can search for a pet (now, only Dogs and
                  Cats) with multiple search options, helping find a perfect
                  match for you.
                </Typography>
                <Typography paragraph>
                  On the pet details page (only for logged users), you can see
                  all the information about the pet, status, save the pet for
                  thinking it over and eventually fostering or adopting the pet.
                </Typography>

                <Grid container direction="row" spacing={1}>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
