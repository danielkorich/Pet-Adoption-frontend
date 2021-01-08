import { useHistory } from "react-router-dom";
import { Box, Button, Card, Grid, Typography } from "@material-ui/core";

const Pets = (props) => {
  let history = useHistory();

  const handleClick = () => {
    history.push(`/users/${props._id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box mt={2}>
        <Card>
          <Box m={2}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Typography gutterBottom>
                  Name: {props.firstName} {props.lastName}
                </Typography>
                <Typography gutterBottom>Email: {props.email}</Typography>
                <Typography gutterBottom>
                  Telephone: {props.telephone}
                </Typography>
                <Typography gutterBottom>
                  Admin: {props.isAdmin ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid item>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleClick()}
                  >
                    See More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default Pets;
