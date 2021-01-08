import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  adoptPet,
  fosterPet,
  getLikedPets,
  getPetById,
  likePet,
  returnPet,
  unlikePet,
} from "../../lib/api/petList";

const PetDetails = (props) => {
  const { user } = useSelector((state) => state.authReducer);
  const [pet, setPet] = useState({});
  const [likedPets, setLikedPets] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const handleEditRedirect = () => {
    history.push(`/edit/${pet._id}`);
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    fetchPetById();
    fetchLikedPets();
  }, []);

  const fetchPetById = () => {
    setIsLoading(true);

    getPetById(props.match.params.id).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setPet(response.data);
        setIsLoading(false);
      }
    });
  };

  const fetchLikedPets = () => {
    setIsLoading(true);

    getLikedPets().then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setLikedPets(response.data);
        setIsLoading(false);
      }
    });
  };

  const handleLikePet = () => {
    setIsLoading(true);
    likePet(pet._id).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setLikedPets(response.data);
        setIsLoading(false);
      }
    });
  };

  const handleUnlikePet = () => {
    setIsLoading(true);
    unlikePet(pet._id).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setLikedPets(response.data);
        setIsLoading(false);
      }
    });
  };

  const handleReturnPet = () => {
    let confirmation = window.confirm(
      "Are you sure that you want to return the pet?"
    );
    if (confirmation === true) {
      setIsLoading(true);
      returnPet(pet._id).then((response) => {
        if (!response) {
          setError("Try Again Later!");
          setIsLoading(false);
          return;
        }
        if (response && response.status >= 400) {
          setError(`${response.data ? response.data : "Try Again Later!"}`);
          setIsLoading(false);
        } else {
          setPet(response.data);
          setIsLoading(false);
        }
      });
    } else {
      return;
    }
  };

  const handleAdoptPet = () => {
    let confirmation = window.confirm(
      "Are you sure that you want to adopt the pet?"
    );
    if (confirmation === true) {
      setIsLoading(true);
      adoptPet(pet._id).then((response) => {
        if (!response) {
          setError("Try Again Later!");
          setIsLoading(false);
          return;
        }
        if (response && response.status >= 400) {
          setError(`${response.data ? response.data : "Try Again Later!"}`);
          setIsLoading(false);
        } else {
          setPet(response.data);
          setIsLoading(false);
        }
      });
    } else {
      return;
    }
  };

  const handleFosterPet = () => {
    let confirmation = window.confirm(
      "Are you sure that you want to foster the pet?"
    );
    if (confirmation === true) {
      setIsLoading(true);
      fosterPet(pet._id).then((response) => {
        if (!response) {
          setError("Try Again Later!");
          setIsLoading(false);
          return;
        }
        if (response && response.status >= 400) {
          setError(` ${response.data ? response.data : "Try Again Later!"}`);
          setIsLoading(false);
        } else {
          setPet(response.data);
          setIsLoading(false);
        }
      });
    } else {
      return;
    }
  };

  const likeButton = () => {
    if (!likedPets || likedPets.indexOf(pet._id) < 0) {
      return (
        <Button
          disabled={isLoading ? true : false}
          onClick={() => handleLikePet()}
        >
          <FavoriteIcon color="disabled" />
        </Button>
      );
    } else
      return (
        <Button
          disabled={isLoading ? true : false}
          onClick={() => handleUnlikePet()}
        >
          <FavoriteIcon color="secondary" />
        </Button>
      );
  };

  const adoptButton = () => {
    if (
      (!pet.isAdopted && !pet.isFostered) ||
      (pet.ownerId === user.id && pet.isFostered)
    ) {
      return (
        <Button
          color="primary"
          variant="contained"
          disabled={isLoading ? true : false}
          onClick={() => handleAdoptPet()}
        >
          Adopt
        </Button>
      );
    }
  };

  const fosterButton = () => {
    if (!pet.isAdopted && !pet.isFostered) {
      return (
        <Button
          color="primary"
          variant="contained"
          disabled={isLoading ? true : false}
          onClick={() => handleFosterPet()}
        >
          Foster
        </Button>
      );
    }
  };

  const returnButton = () => {
    if ((pet.isAdopted || pet.isFostered) && pet.ownerId === user.id) {
      return (
        <Button
          color="secondary"
          variant="contained"
          disabled={isLoading ? true : false}
          onClick={() => handleReturnPet()}
        >
          Return
        </Button>
      );
    }
  };

  const ownerTag = () => {
    if (pet.ownerId === user.id) {
      if (pet.isFostered) {
        return (
          <Box bgcolor="warning.main" display="flex" justifyContent="center">
            <Typography>Fostered by you!</Typography>
          </Box>
        );
      } else if (pet.isAdopted) {
        return (
          <Box bgcolor="secondary.main" display="flex" justifyContent="center">
            <Typography>Adopted by you!</Typography>
          </Box>
        );
      }
    } else {
      if (pet.isFostered) {
        return (
          <Box bgcolor="warning.main" display="flex" justifyContent="center">
            <Typography>Fostered</Typography>
          </Box>
        );
      } else if (pet.isAdopted) {
        return (
          <Box bgcolor="secondary.main" display="flex" justifyContent="center">
            <Typography>Adopted</Typography>
          </Box>
        );
      } else
        return (
          <Box bgcolor="success.main" display="flex" justifyContent="center">
            <Typography>Available</Typography>
          </Box>
        );
    }
  };

  return (
    <Box mt={10} mb={5}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <Box mr={1}>
            <IconButton
              onClick={() => {
                handleBack();
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          {error ? (
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
            <Box mt={2}>
              <Card>
                <Box m={2}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={6}>
                      <Box display="flex" justifyContent="center">
                        <img
                          width={200}
                          height={200}
                          alt={props.name}
                          src={
                            pet.imageUrl
                              ? pet.imageUrl
                              : "https://res.cloudinary.com/danielkorich/image/upload/v1610018001/Photo_Coming_Soon_f7gb1x.png"
                          }
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={10} sm={8} md={5}>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Typography gutterBottom>Name: {pet.name}</Typography>
                          <Typography gutterBottom>Type: {pet.type}</Typography>
                          <Typography gutterBottom>
                            Breed: {pet.breed}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom>
                            Color: {pet.color}
                          </Typography>
                          <Typography gutterBottom>
                            Weigth: {pet.weight}
                          </Typography>
                          <Typography gutterBottom>
                            Height: {pet.height}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        {pet.bio ? (
                          <Typography gutterBottom>Bio: {pet.bio}</Typography>
                        ) : (
                          <></>
                        )}
                        <Typography gutterBottom>
                          Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
                        </Typography>
                        <Typography gutterBottom>
                          Dietary Restrictions: {pet.dietaryRest ? "Yes" : "No"}
                        </Typography>
                      </Grid>

                      <Typography variant="subtitle1"> {ownerTag()}</Typography>
                    </Grid>
                  </Grid>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={4}
                  >
                    <Box>{likeButton()}</Box>
                    <Box mr={2}>{returnButton()}</Box>
                    <Box mr={2}>{adoptButton()}</Box>
                    <Box mr={2}>{fosterButton()}</Box>
                    {user.isAdmin ? (
                      <Box mr={1}>
                        <IconButton
                          onClick={() => {
                            handleEditRedirect();
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default PetDetails;
