import { Button, Card, Grid, IconButton, Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function LogModal(props) {
  const modalIsSignIn = () => {
    props.modalIsSignIn();
  };

  const content = props.isModalSignIn ? (
    <SignIn></SignIn>
  ) : (
    <SignUp modalIsSignIn={modalIsSignIn}></SignUp>
  );

  return (
    <Modal
      open={props.isModalOpen}
      onClose={() => {
        props.handleClose();
      }}
      style={{
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        top: "10vh",
        width: "92vw",
        minWidth: "330px",
        maxWidth: "600px",
      }}
    >
      <Card>
        <Card style={{ backgroundColor: "#3F51B5" }}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  props.modalIsSignIn();
                }}
                disabled={props.isModalSignIn}
              >
                Sign In
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  props.modalIsSignUp();
                }}
                disabled={props.isModalSignUp}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  props.handleClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
        {content}
      </Card>
    </Modal>
  );
}

export default LogModal;
