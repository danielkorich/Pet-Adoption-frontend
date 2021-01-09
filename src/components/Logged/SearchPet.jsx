import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress } from "@material-ui/core";
import { searchByQuery } from "../../lib/api/petList";
import SearchForm from "../PetSearch/SearchForm";
import PetList from "./PetList.jsx";

const SearchPet = () => {
  const [pets, setPets] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchQueryInfo("");
  }, []);

  const searchQueryInfo = (query) => {
    setIsLoading(true);
    searchByQuery(query).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setPets("");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setPets("");
        setIsLoading(false);
      } else {
        setPets(response.data);
        setError("");
        setIsLoading(false);
      }
    });
  };

  return (
    <Box mt={12} mb={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <SearchForm searchQueryInfo={searchQueryInfo}></SearchForm>
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
          ) : pets ? (
            <PetList pets={pets} />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default SearchPet;
