import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, Grid, IconButton, LinearProgress } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getUserById } from "../../lib/api/admin";
import AdminUserPetList from "./AdminUserPetList";

const UserDetails = (props) => {
  const [user, setUser] = useState({});
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    fetchUserById();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const fetchUserById = () => {
    setIsLoading(true);

    getUserById(props.match.params.id).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setUser(response.data.user);
        setPets(response.data.pets);
        setIsLoading(false);
      }
    });
  };

  return (
    <Box mt={10} mb={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <IconButton
            onClick={() => {
              handleBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box mt={2}>
            <Card>
              <Box m={4}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    Name: {user.firstName} {user.lastName}
                  </Grid>
                  <Grid item>Email: {user.email}</Grid>
                  <Grid>Telephone: {user.telephone}</Grid>
                  {user.bio ? (
                    <Grid item xs={12} sm={12} md={12}>
                      Bio: {user.bio}
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Box>
            </Card>
          </Box>
          {isLoading ? (
            <Box mt={15}>
              <LinearProgress></LinearProgress>
            </Box>
          ) : error ? (
            <Box
              mt={15}
              bgcolor="error.main"
              color="primary.contrastText"
              display="flex"
              justifyContent="center"
              p={1}
            >
              {error}
            </Box>
          ) : pets.length ? (
            <AdminUserPetList pets={pets} />
          ) : (
            <Box
              mt={15}
              bgcolor="error.main"
              color="primary.contrastText"
              display="flex"
              justifyContent="center"
              p={1}
            >
              User is not fostering or own any pet!
            </Box>
          )}
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default UserDetails;
