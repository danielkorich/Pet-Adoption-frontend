import { Box, Card, Grid, Typography } from "@material-ui/core";

const Pets = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box mt={2}>
        <Card>
          <Box m={2}>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <img
                  width={100}
                  height={100}
                  alt={props.name}
                  src={
                    props.imageUrl
                      ? props.imageUrl
                      : "https://res.cloudinary.com/danielkorich/image/upload/v1610018001/Photo_Coming_Soon_f7gb1x.png"
                  }
                />
                {props.isAdopted ? (
                  <Box
                    bgcolor="secondary.main"
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography>Adopted</Typography>
                  </Box>
                ) : props.isFostered ? (
                  <Box
                    bgcolor="warning.main"
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography>Fostered</Typography>
                  </Box>
                ) : (
                  <Box
                    bgcolor="success.main"
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography>Available</Typography>
                  </Box>
                )}
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography gutterBottom>Name: {props.name}</Typography>
                    <Typography gutterBottom>Type: {props.type}</Typography>
                    <Typography gutterBottom>Breed: {props.breed}</Typography>
                    <Box
                      bgcolor="primary.main"
                      color="primary.contrastText"
                      display="flex"
                      justifyContent="center"
                      p={1}
                    >
                      SIGN IN TO SEE MORE!
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default Pets;
