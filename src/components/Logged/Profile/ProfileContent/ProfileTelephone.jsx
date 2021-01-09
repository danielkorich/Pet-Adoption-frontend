import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { updateTelephone } from "../../../../actions/updateProfile";

const ProfileTelephone = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [telephone, setTelephone] = useState(user.telephone);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateTelephone = (e) => {
    e.preventDefault();
    if (telephone === "") {
      setError("Please enter a telephone");
      return;
    }

    setError("");
    setIsLoading(true);

    let data = {
      telephone: telephone,
    };

    dispatch(updateTelephone(data)).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      } else if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("")
        alert("Telephone saved successfully! ");
      }
    });
  };

  const onTelephoneChange = (e) => {
    setError("");
    setTelephone(e.target.value);
  };

  return (
    <Box mt={2}>
      <Card>
        <Box m={2}>
          <TextField
            label="Telephone Number"
            placeholder="E.g: +972(05X)-xxx-xxx"
            id="telephone"
            name="telephone"
            type="telephone"
            margin="normal"
            fullWidth
            required
            error={error ? true : false}
            helperText={error ? error : ""}
            value={telephone}
            onChange={(e) => onTelephoneChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading ? true : false}
            onClick={(e) => {
              handleUpdateTelephone(e);
            }}
          >
            Update Telephone
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileTelephone;
