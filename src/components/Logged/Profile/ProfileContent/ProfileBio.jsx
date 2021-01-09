import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, TextField } from "@material-ui/core";
import { updateBio } from "../../../../actions/updateProfile";

const ProfileBio = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleUpdateBio = (e) => {
    e.preventDefault();
    if (bio.length > 40) {
      setError("Bio cannot contain more than 40 chars!");
      return;
    }

    setError("");
    setIsLoading(true);
    let data = {
      bio: bio,
    };

    dispatch(updateBio(data)).then((response) => {
      if (!response) {
        setError("Try Again Later!");
        setIsLoading(false);
        return;
      } else if (response && response.status >= 400) {
        setError(`${response.data ? response.data : "Try Again Later!"}`);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("");
        alert("Bio saved successfully! ");
      }
    });
  };

  const onBioChange = (e) => {
    setError("");
    setBio(e.target.value);
  };

  return (
    <Box mt={2}>
      <Card>
        <Box m={2}>
          <TextField
            label="Bio"
            placeholder="Add a Bio"
            id="userBio"
            name="userBio"
            type="text"
            margin="normal"
            fullWidth
            error={error ? true : false}
            helperText={error ? error : ""}
            value={bio}
            onChange={(e) => onBioChange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading ? true : false}
            onClick={(e) => {
              handleUpdateBio(e);
            }}
          >
            Update Bio
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileBio;
