import { Grid } from "@material-ui/core";
import Pets from "./Pets";

const PetList = ({ pets }) => {
  return (
    <Grid container direction="row" spacing={1}>
      {pets.map((e) => (
        <Pets key={e._id} {...e} />
      ))}
    </Grid>
  );
};

export default PetList;
