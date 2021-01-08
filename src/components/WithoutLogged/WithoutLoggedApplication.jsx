import { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import HomeIcon from "@material-ui/icons/Home";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import LogModal from "./LogModal";
import Home from "../Homepage/Home";
import SearchPet from "./SearchPet";

const LogApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSignIn, setIsModalSingIn] = useState(true);
  const [isModalSignUp, setIsModalSingUp] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = () => {
    setIsModalSingIn(true);
    setIsModalSingUp(false);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const modalIsSignIn = () => {
    setIsModalSingIn(true);
    setIsModalSingUp(false);
  };

  const modalIsSignUp = () => {
    setIsModalSingIn(false);
    setIsModalSingUp(true);
  };

  return (
    <Router>
      <nav>
        <Divider />
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <List>
            <ListItem>
              <IconButton
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            </ListItem>
          </List>
          <Link className="text-decor-none" to="/">
            <List>
              <ListItem>
                <ListItemIcon>
                  <Button
                    className="nav-button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setIsDrawerOpen(false);
                    }}
                  >
                    <HomeIcon />
                    Home
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
          </Link>
          <Link className="text-decor-none" to="/searchpet">
            <List>
              <ListItem>
                <ListItemIcon>
                  <Button
                    className="nav-button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setIsDrawerOpen(false);
                    }}
                  >
                    <SearchIcon />
                    Search
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
          </Link>
        </Drawer>
        <AppBar>
          <Toolbar>
            <Grid item sm={1} md={2}></Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <IconButton
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                >
                  {!isDrawerOpen ? <ReorderIcon /> : null}
                </IconButton>
              </Grid>
              <Grid item>ADOPT, SAVE A LIFE!</Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
            <Grid item sm={1} md={2}></Grid>
          </Toolbar>
        </AppBar>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/searchpet">
          <SearchPet></SearchPet>
        </Route>
        <Redirect to="/" />
      </Switch>
      <LogModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        modalIsSignIn={modalIsSignIn}
        modalIsSignUp={modalIsSignUp}
        isModalSignIn={isModalSignIn}
        isModalSignUp={isModalSignUp}
      ></LogModal>
    </Router>
  );
};

export default LogApplication;
