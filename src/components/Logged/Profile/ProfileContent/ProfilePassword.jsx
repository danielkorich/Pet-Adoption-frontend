import { useState } from "react";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { updatePassword } from "../../../../actions/updateProfile";

const ProfilePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordVer, setPasswordVer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = (e) => {
    if (password === "" || passwordVer === "") {
      setError("Please enter all required information!");
      return;
    }

    if (password.length < 6 || password.length > 15) {
      setError("The password must contain 6-15 characters!");
      return;
    }
    if (password !== passwordVer) {
      setError("Passords don't match!");
      return;
    }

    setError("");
    setIsLoading(true);

    let data = {
      password: password,
      password2: passwordVer,
    };
    updatePassword(data).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      } else if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setPassword("");
        setPasswordVer("");
        alert("Password saved successfully! ");
        setIsLoading(false);
      }
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    setError("");

    if (name === "Password") {
      setPassword(value);
    } else if (name === "PasswordVer") {
      setPasswordVer(value);
    }
  };

  return (
    <Box mt={2}>
      <Card>
        <Box m={2}>
          <TextField
            placeholder="Your Password"
            label="Password"
            id="Password"
            name="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            error={error ? true : false}
            helperText={error ? error : ""}
            value={password}
            onChange={(e) => onChangeHandler(e)}
          />
          <TextField
            placeholder="Reapet your Password"
            label="Repeat Password"
            id="PasswordVer"
            name="PasswordVer"
            type="password"
            margin="normal"
            fullWidth
            required
            error={error ? true : false}
            helperText={error ? error : ""}
            value={passwordVer}
            onChange={(e) => onChangeHandler(e)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading ? true : false}
            onClick={(e) => {
              handleUpdatePassword(e);
            }}
          >
            Update Password
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfilePassword;
