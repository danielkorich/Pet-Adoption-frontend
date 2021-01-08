import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { loginUser } from "../../actions/authActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setError({ email: "Please enter valid email address." });
      return;
    }

    if (password.length < 6 || password.length > 15) {
      setError({
        password: "The password must contain 6-15 characters!",
      });
      return;
    }

    setError({});
    setIsLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    dispatch(loginUser(userData)).then((response) => {
      if (!response) {
        setError({ other: "Try Again Later!" });
        setIsLoading(false);
        return;
      }
      if (response && response.status >= 400) {
        if (response.data.email || response.data.password) {
          setError(response.data);
        } else setError({ other: response.data });
        setIsLoading(false);
      }
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;
    setError({});

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <h1>Sign In</h1>
        </Box>
        <form>
          <Box ml={3} mr={3}>
            <TextField
              label="Email"
              placeholder="E.g: johndoe@johndoe.com"
              id="userEmail"
              name="userEmail"
              type="email"
              margin="normal"
              variant="outlined"
              fullWidth
              autoFocus
              required
              error={error.email ? true : false}
              helperText={error.email ? error.email : ""}
              value={email}
              onChange={(e) => onChangeHandler(e)}
            />
            <Grid container alignItems="flex-start">
              <Grid item xs={12} sm={8} md={8}>
                <TextField
                  label="Password"
                  margin="normal"
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  placeholder="Your Password"
                  variant="outlined"
                  fullWidth
                  required
                  error={error.password ? true : false}
                  helperText={error.password ? error.password : ""}
                  value={password}
                  onChange={(e) => onChangeHandler(e)}
                />
              </Grid>
              <Grid item xs={false} sm={1} md={1}></Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading ? true : false}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Sign in
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={false} sm={1} md={1}></Grid>
              <Box height="20px" width="100%" mt={2}>
                {error.other && (
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

export default SignIn;
