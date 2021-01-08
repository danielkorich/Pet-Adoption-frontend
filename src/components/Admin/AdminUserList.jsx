import { Grid } from "@material-ui/core";
import User from "./User";

const AdminUserList = ({ users }) => {
  return (
    <Grid container direction="row" spacing={1}>
      {users.map((e) => (
        <User key={e._id} {...e} />
      ))}
    </Grid>
  );
};

export default AdminUserList;
