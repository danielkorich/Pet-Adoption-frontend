import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";

import { registerUser } from "../../actions/authActions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      passwordVer === "" ||
      firstName === "" ||
      lastName === "" ||
      telephone === ""
    ) {
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

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setError({ email: "Please enter valid email address." });
      return;
    }

    if (password.length < 6 || password.length > 15) {
      setError({ password: "The password must contain 6-15 characters!" });
      return;
    }

    if (password !== passwordVer) {
      setError({
        password: "Passords don't match!",
        passwordVer: "Passords don't match!",
      });
      return;
    }

    setError({});
    setIsLoading(true);

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      telephone: telephone,
      email: email,
      password: password,
      password2: passwordVer,
    };

    dispatch(registerUser(newUser)).then((response) => {
      if (!response) {
        setError({ other: "Try Again Later!" });
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        if (
          response.data.email ||
          response.data.firstName ||
          response.data.lastName ||
          response.data.telephone ||
          response.data.password ||
          response.data.passwordVer
        ) {
          setError(response.data);
          setIsLoading(false);
        }
      }
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "Password") {
      setPassword(value);
    } else if (name === "PasswordVer") {
      setPasswordVer(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "telephone") {
      setTelephone(value);
    }

    setError({});
  };

  return (
    <Grid container spacing={3} alignItems="flex-start">
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <h1>Sign Up</h1>
        </Box>
        <form>
          <Box ml={3} mr={3}>
            <Grid container alignItems="flex-start">
              <Grid item xs={5}>
                <TextField
                  label="First Name"
                  placeholder="E.g: John"
                  id="firstName"
                  name="firstName"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  autoFocus
                  required
                  error={error.firstName ? true : false}
                  helperText={error.firstName ? error.firstName : ""}
                  value={firstName}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  placeholder="E.g: Doe"
                  id="lastName"
                  name="lastName"
                  type="text"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  required
                  error={error.lastName ? true : false}
                  helperText={error.lastName ? error.lastName : ""}
                  value={lastName}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start">
              <Grid item xs={12} sm={7} md={7}>
                <TextField
                  label="Email"
                  placeholder="E.g: johndoe@johndoe.com"
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={error.email ? true : false}
                  helperText={error.email ? error.email : ""}
                  value={email}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={1}></Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  label="Telephone Number"
                  placeholder="E.g: +972(05X)-xxx-xxx"
                  id="telephone"
                  name="telephone"
                  type="telephone"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={error.telephone ? true : false}
                  helperText={error.telephone ? error.telephone : ""}
                  value={telephone}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="flex-start">
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  label="Password"
                  placeholder="Your Password"
                  id="Password"
                  name="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={error.password ? true : false}
                  helperText={error.password ? error.password : ""}
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
                <TextField
                  label="Repeat Password"
                  placeholder="Reapet your Password"
                  id="PasswordVer"
                  name="PasswordVer"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  required
                  error={error.passwordVer ? true : false}
                  helperText={error.passwordVer ? error.passwordVer : ""}
                  value={passwordVer}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={1}></Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Box mt={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading ? true : false}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={1}></Grid>
              <Box height="20px" width="100%" mt={2}>
                {error.other !== null && (
                  <Box
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" color="error">
                      {error.other}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Box>
        </form>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={1}
          mb={2}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
