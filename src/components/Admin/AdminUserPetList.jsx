import { Grid } from "@material-ui/core";
import AdminUserPet from "./AdminUserPet";

const AdminUserPetList = ({ pets }) => {
  return (
    <Grid container direction="row" spacing={1}>
      {pets.map((e) => (
        <AdminUserPet key={e._id} {...e} />
      ))}
    </Grid>
  );
};

export default AdminUserPetList;
