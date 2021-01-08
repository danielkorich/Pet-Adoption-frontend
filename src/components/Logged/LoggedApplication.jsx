import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
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

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ReorderIcon from "@material-ui/icons/Reorder";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PetsIcon from "@material-ui/icons/Pets";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { logoutUser } from "../../actions/authActions";
import Home from "../Homepage/Home";
import Profile from "./Profile/Profile";
import ListOfUsers from "../Admin/ListOfUsers";
import UserDetails from "../Admin/UserDetails";
import NewPetForm from "../Admin/NewPetForm";
import SearchPet from "./SearchPet";
import PetDetails from "./PetDetails";
import UserPets from "./UserPets";
import UserLikedPets from "./UserLikedPets";
import EditPet from "../Admin/EditPet";

const LoggedinApplication = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logoutUser());
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
          <Link className="text-decor-none" to="/profile">
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
                    <PermIdentityIcon />
                    Profile
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
          </Link>
          <Link className="text-decor-none" to="/mypets">
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
                    <PetsIcon />
                    My Pets
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
          </Link>
          <Link className="text-decor-none" to="/likedpets">
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
                    <FavoriteBorderIcon />
                    Pets
                  </Button>
                </ListItemIcon>
              </ListItem>
            </List>
          </Link>
          {user.isAdmin ? (
            <>
              <Link className="text-decor-none" to="/newpet">
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
                        <SupervisorAccountIcon />
                        New Pet (admin)
                      </Button>
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Link>
              <Link className="text-decor-none" to="/users">
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
                        <SupervisorAccountIcon />
                        Users (admin)
                      </Button>
                    </ListItemIcon>
                  </ListItem>
                </List>
              </Link>
            </>
          ) : (
            <></>
          )}
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
                <Button color="secondary" variant="contained" onClick={logOut}>
                  LogOut
                </Button>
              </Grid>
            </Grid>
            <Grid item sm={1} md={2}></Grid>
          </Toolbar>
        </AppBar>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home user={user}></Home>
        </Route>
        <Route path="/searchpet">
          <SearchPet></SearchPet>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/mypets">
          <UserPets></UserPets>
        </Route>
        <Route path="/likedpets">
          <UserLikedPets></UserLikedPets>
        </Route>
        <Route path="/pets/:id" render={(props) => <PetDetails {...props} />} />
        <Route path="/newpet">
          {user.isAdmin ? <NewPetForm></NewPetForm> : <Redirect to="/" />}
        </Route>
        <Route exact path="/users">
          {user.isAdmin ? <ListOfUsers></ListOfUsers> : <Redirect to="/" />}
        </Route>
        {user.isAdmin ? (
          <Route
            path="/users/:id"
            render={(props) => <UserDetails {...props} />}
          />
        ) : (
          <Redirect to="/" />
        )}
        {user.isAdmin ? (
          <Route path="/edit/:id" render={(props) => <EditPet {...props} />} />
        ) : (
          <Redirect to="/" />
        )}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default LoggedinApplication;
