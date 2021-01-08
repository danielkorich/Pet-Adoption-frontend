import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { updateEmail } from "../../../../actions/updateProfile";

const ProfileEmail = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setError("Please enter valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);

    let data = {
      email: email,
    };
    dispatch(updateEmail(data)).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      } else if (response && response.status >= 400) {
        setError(
          `${response.data ? response.data : "Try Again Later!"}`
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert("Email saved successfully! ");
      }
    });
  };

  const onEmailChange = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  return (
    <Box mt={2}>
      <Card>
        <Box m={2}>
          <TextField
            label="Email"
            placeholder="E.g: johndoe@johndoe.com"
            id="userEmail"
            name="userEmail"
            type="email"
            margin="normal"
            fullWidth
            required
            error={error ? true : false}
            helperText={error ? error : ""}
            value={email}
            onChange={(e) => onEmailChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading ? true : false}
            onClick={(e) => {
              handleUpdateEmail(e);
            }}
          >
            Update Email
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileEmail;
