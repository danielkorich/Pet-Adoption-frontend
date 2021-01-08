import { useHistory } from "react-router-dom";
import { Box, Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProfileName from "./ProfileContent/ProfileName";
import ProfileBio from "./ProfileContent/ProfileBio";
import ProfileEmail from "./ProfileContent/ProfileEmail";
import ProfilePassword from "./ProfileContent/ProfilePassword";
import ProfileTelephone from "./ProfileContent/ProfileTelephone";

const Profile = () => {
  let history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Box mt={10} mb={4}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={false} sm={2} md={2}></Grid>
        <Grid item xs={11} sm={8} md={8}>
          <IconButton
            onClick={() => {
              handleBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <ProfileName></ProfileName>
          <ProfileBio></ProfileBio>
          <ProfileTelephone></ProfileTelephone>
          <ProfileEmail></ProfileEmail>
          <ProfilePassword></ProfilePassword>
        </Grid>
        <Grid item xs={false} sm={2} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
