import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { updateName } from "../../../../actions/updateProfile";

const ProfileName = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateName = (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      setError({ other: "Please enter all required information!" });
      return;
    }
    if (firstName.length < 3 || firstName.length > 12) {
      setError({ firstName: "The First Name must cointain 3-12 characters!" });
      return;
    }
    if (lastName.length < 3 || lastName.length > 12) {
      setError({ lastName: "The Last Name must cointain 3-12 characters!" });
      return;
    }

    setError({});
    setIsLoading(true);

    let data = {
      firstName: firstName,
      lastName: lastName,
    };

    dispatch(updateName(data)).then((response) => {
      if (!response) {
        setError({ other: "Try Again Later!" });
        setIsLoading(false);
        return;
      } else if (response && response.status >= 400) {
        setError(
          `${response.data ? response.data : { other: "Try Again Later!" }}`
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert("Name saved successfully! ");
      }
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setError({});

    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    }
  };

  return (
    <Box mt={2}>
      <Card>
        <Box m={2}>
          <TextField
            label="First Name"
            placeholder="E.g: John"
            id="firstName"
            name="firstName"
            type="text"
            margin="normal"
            fullWidth
            required
            error={error.firstName ? true : error.other ? true : false}
            helperText={
              error.firstName ? error.firstName : error.other ? error.other : ""
            }
            value={firstName}
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            label="Last Name"
            placeholder="E.g: Doe"
            id="lastName"
            name="lastName"
            type="text"
            margin="normal"
            fullWidth
            required
            error={error.lastName ? true : error.other ? true : false}
            helperText={
              error.lastName ? error.lastName : error.other ? error.other : ""
            }
            value={lastName}
            onChange={(e) => onChangeHandler(e)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading ? true : false}
            onClick={(e) => {
              handleUpdateName(e);
            }}
          >
            Update Name
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
export default ProfileName;
