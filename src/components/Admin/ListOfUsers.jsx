import { useState, useEffect } from "react";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import { getAllUsers } from "../../lib/api/admin";
import AdminUserList from "./AdminUserList.jsx";

const ListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchListOfUsers();
  }, []);

  const fetchListOfUsers = () => {
    setIsLoading(true);
    getAllUsers().then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setUsers("");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setUsers("");
        setIsLoading(false);
      } else {
        setUsers(response.data);
        setIsLoading(false);
        setError("");
      }
    });
  };

  return (
    <Box mt={12} mb={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <Box
            bgcolor="primary.main"
            color="primary.contrastText"
            display="flex"
            justifyContent="center"
            p={1}
          >
            List of Users
          </Box>
          {isLoading ? (
            <Box mt={15}>
              <LinearProgress></LinearProgress>
            </Box>
          ) : users ? (
            <AdminUserList users={users} />
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
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default ListOfUsers;
