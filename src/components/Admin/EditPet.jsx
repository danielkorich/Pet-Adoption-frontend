import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { editPet } from "../../lib/api/admin";
import { getPetById } from "../../lib/api/petList";

const NewPetForm = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRest, setDietaryRest] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    fetchPetById();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const fetchPetById = () => {
    setIsLoading(true);

    getPetById(props.match.params.id).then((response) => {
      if (!response) {
        setError({ other: "Try Again Later!" });
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        setError(
          `${response.data ? response.data : { other: "Try Again Later!" }}`
        );
        setIsLoading(false);
      } else {
        setName(response.data.name);
        setType(response.data.type);
        setBreed(response.data.breed);
        setColor(response.data.color);
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setBio(response.data.bio);
        setHypoallergenic(response.data.hypoallergenic);
        setDietaryRest(response.data.dietaryRest);
        setId(response.data._id);
        setIsLoading(false);
      }
    });
  };

  const weightmarks = [
    {
      value: 0,
      label: "0kg",
    },
    {
      value: 20,
      label: "20kg",
    },
    {
      value: 40,
      label: "40kg",
    },
    {
      value: 60,
      label: "60kg",
    },
  ];

  const heightmarks = [
    {
      value: 0,
      label: "0cm",
    },
    {
      value: 20,
      label: "20cm",
    },
    {
      value: 40,
      label: "40cm",
    },
    {
      value: 60,
      label: "60cm",
    },
    {
      value: 80,
      label: "80cm",
    },
  ];

  const selectFile = (event) => {
    if (event.target.files.length > 1) {
      setError({ file: "Cannot add more than one file" });
    } else {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onHandleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "bio") {
      setBio(value);
    } else if (name === "hypoallergenic") {
      setHypoallergenic(checked);
    } else if (name === "dietaryRest") {
      setDietaryRest(checked);
    } else if (name === "breed") {
      setBreed(value);
    } else if (name === "color") {
      setColor(value);
    }
    setError({});
  };

  const onWeightChange = (e, value) => {
    setWeight(value);
    setError({});
  };
  
  const onHeightChange = (e, value) => {
    setHeight(value);
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setError({ name: "Name is required!" });
      return;
    }

    if (breed === "") {
      setError({ breed: "Breed is required!" });
      return;
    }

    setError({});
    setIsLoading(true);
    let bodyFormData = new FormData();
    let data = {
      id: id,
      name: name,
      type: type,
      breed: breed,
      color: color,
      height: height,
      weight: weight,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietaryRest: dietaryRest,
    };

    for (var key in data) {
      bodyFormData.append(key, data[key]);
    }
    bodyFormData.append("image", selectedFile);

    editPet(bodyFormData).then((response) => {
      if (!response) {
        setError({ other: "Try Again Later!" });
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        if (
          response.data.name ||
          response.data.type ||
          response.data.breed ||
          response.data.color ||
          response.data.height ||
          response.data.weight ||
          response.data.bio
        ) {
          setError(response.data);
          setIsLoading(false);
        } else {
          setError({ other: response.data });
          setIsLoading(false);
        }
      }
      if (response.status < 400) {
        setIsLoading(false);
        alert("Pet updated successfully! ");
      }
    });
  };

  return (
    <Box mt={10} mb={4}>
      <Grid container direction="row" justify="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <Card>
            <Box m={2}>
              {error.other ? (
                <Box
                  bgcolor="error.main"
                  color="primary.contrastText"
                  display="flex"
                  justifyContent="center"
                >
                  {error.other}
                </Box>
              ) : (
                <></>
              )}
              <Box display="flex">
                <Box flexGrow={1}>
                  <IconButton
                    onClick={() => {
                      handleBack();
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
                <IconButton variant="contained" component="label">
                  <AddAPhotoIcon />
                  <input
                    type="file"
                    name="file"
                    hidden
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => selectFile(e)}
                  />
                </IconButton>
              </Box>
              <Box mt={4} mb={3}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Name"
                      placeholder="Pet Name"
                      id="name"
                      name="name"
                      type="name"
                      variant="outlined"
                      fullWidth
                      required
                      error={error.name ? true : false}
                      helperText={error.name ? error.name : ""}
                      value={name}
                      onChange={(e) => onHandleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Breed"
                      placeholder="Breed"
                      id="breed"
                      name="breed"
                      type="text"
                      variant="outlined"
                      fullWidth
                      required
                      error={error.breed ? true : false}
                      helperText={error.breed ? error.breed : ""}
                      value={breed}
                      onChange={(e) => onHandleChange(e)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      label="Bio"
                      placeholder="Bio"
                      id="bio"
                      name="bio"
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={bio}
                      onChange={(e) => onHandleChange(e)}
                    />
                  </Grid>

                  <Grid item>
                    <Select
                      inputProps={{
                        name: "type",
                        id: "type",
                      }}
                      native
                      variant="outlined"
                      value={type}
                      onChange={(e) => onHandleChange(e)}
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </Select>
                  </Grid>

                  <Grid item>
                    <Select
                      inputProps={{
                        name: "color",
                        id: "color",
                      }}
                      native
                      variant="outlined"
                      value={color}
                      onChange={(e) => onHandleChange(e)}
                    >
                      <option value="undef">undef</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      <option value="White">White</option>
                      <option value="Red">Red</option>
                      <option value="Gold">Gold</option>
                      <option value="Yellow">Yellow</option>
                      <option value="Cream">Cream</option>
                      <option value="Blue">Blue</option>
                      <option value="Grey">Grey</option>
                      <option value="Cinnamon">Cinnamon</option>
                      <option value="Fawn">Fawn</option>
                    </Select>
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label="Hypoallergenic"
                      labelPlacement="bottom"
                      value="hypoallergenic"
                      control={
                        <Switch
                          checked={hypoallergenic}
                          onChange={(e) => onHandleChange(e)}
                          name="hypoallergenic"
                        />
                      }
                    />
                  </Grid>

                  <Grid item>
                    <FormControlLabel
                      label="Dietary Rest."
                      labelPlacement="bottom"
                      value="dietaryRest"
                      control={
                        <Switch
                          checked={dietaryRest}
                          onChange={(e) => onHandleChange(e)}
                          name="dietaryRest"
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
              <Typography id="height" gutterBottom>
                Height
              </Typography>
              <Slider
                min={0}
                max={80}
                step={1}
                onChange={onHeightChange}
                value={height}
                marks={heightmarks}
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="auto"
              />
              <Typography id="weight" gutterBottom>
                Weight
              </Typography>
              <Slider
                min={0}
                max={60}
                step={1}
                onChange={onWeightChange}
                value={weight}
                marks={weightmarks}
                variant="outlined"
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="auto"
              />
              <Box mt={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isLoading ? true : false}
                  onClick={(e) => handleSubmit(e)}
                >
                  Edit Pet
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default NewPetForm;
