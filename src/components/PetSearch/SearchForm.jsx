import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const queryString = require("query-string");

const SearchForm = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [height, setHeight] = useState([0, 80]);
  const [weight, setWeight] = useState([0, 60]);
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRest, setDietaryRest] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

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

  const onHandleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "type") {
      setType(value);
    } else if (name === "breed") {
      setBreed(value);
    } else if (name === "color") {
      setColor(value);
    } else if (name === "hypoallergenic") {
      setHypoallergenic(checked);
    } else if (name === "dietaryRest") {
      setDietaryRest(checked);
    } else if (name === "isAvailable") {
      setIsAvailable(checked);
    }
  };

  const onWeightChange = (e, value) => {
    setWeight(value);
  };

  const onHeightChange = (e, value) => {
    setHeight(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let parseContent = {};
    if (name) {
      parseContent.name = name;
    }
    if (type) {
      parseContent.type = type;
    }
    if (breed) {
      parseContent.breed = breed;
    }
    if (color) {
      parseContent.color = color;
    }
    if (height[0] > 0) {
      parseContent.heightMin = height[0];
    }
    if (height[1] < 80) {
      parseContent.heightMax = height[1];
    }
    if (weight[0] > 0) {
      parseContent.weightMin = weight[0];
    }
    if (weight[1] < 60) {
      parseContent.weightMax = weight[1];
    }
    if (hypoallergenic) {
      parseContent.hypoallergenic = hypoallergenic;
    }
    if (dietaryRest) {
      parseContent.dietaryRest = dietaryRest;
    }
    if (isAvailable) {
      parseContent.isAvailable = isAvailable;
    }

    props.searchQueryInfo(queryString.stringify(parseContent));
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
          p={0}
        >
          <Grid container justify="space-evenly" alignItems="center">
            <Grid item xs={7} sm={8} md={9}>
              <TextField
                label="Name"
                placeholder="Pet Name"
                id="name"
                name="name"
                type="name"
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={name}
                onChange={(e) => onHandleChange(e)}
              />
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit(e)}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="row">
            <Grid item xs={false} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              <Grid container direction="column">
                <Grid container justify="space-between" alignItems="center">
                  <Grid container item xs={5} sm={5} md={5} justify="center">
                    <TextField
                      label="Breed"
                      placeholder="Breed"
                      id="breed"
                      name="breed"
                      type="breed"
                      variant="outlined"
                      value={breed}
                      fullWidth
                      onChange={(e) => onHandleChange(e)}
                    />
                  </Grid>
                  <Grid container item xs={4} sm={4} md={3} justify="center">
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
                      <option value="">Color</option>
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
                  <Grid container item xs={3} sm={3} md={3} justify="center">
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
                      <option value="">All</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </Select>
                  </Grid>
                  <Grid container item xs={3} sm={3} md={3} justify="center">
                    <FormControlLabel
                      label="Avalable"
                      labelPlacement="bottom"
                      value="isAvailable"
                      control={
                        <Switch
                          checked={isAvailable}
                          onChange={(e) => onHandleChange(e)}
                          name="isAvailable"
                        />
                      }
                    />
                  </Grid>
                  <Grid container item xs={5} sm={5} md={5} justify="center">
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
                  <Grid container item xs={4} sm={4} md={4} justify="center">
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
                </Grid>
                <Box mt={1}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid container item xs={12} sm={5} md={5} justify="center">
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
                        aria-labelledby="range-slider"
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                    <Grid item xs={false} sm={1} md={1}></Grid>
                    <Grid container item xs={12} sm={5} md={5} justify="center">
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
                        aria-labelledby="range-slider"
                        valueLabelDisplay="auto"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={false} sm={1}></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SearchForm;
