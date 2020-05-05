import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '../../shared/card-template/RCard';
import Navbar from '../dashboard/components/navbar';
import Create from './../../shared/components/CreateDialog/CreateRoommateDialog';
import CitySelect from '../dashboard/components/locationSearch';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    direction: 'row',
    alignItems: 'center',
    justify: 'flex-start',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    paddingLeft: 10,
  },
}));

const Roommates = () => {
  const [value, setValue] = React.useState([]);

  const getRoommates = async () => {
    let importedRooms = [];
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      await axios
        .get(`http://localhost:5000/api/roommates`, config)
        .then((response) => {
          const imported = response.data.rommmates;
          let importedRoom;
          let a;
          const requests = imported.map(async (r) => {
            await axios
              .get(
                `http://localhost:5000/api/addresses/${r.address}`,
                config
              )
              .then((res) => {
                a = res.data.address;
                console.log(a);
              })
              .catch((err) => {
                console.log(err);
              });
          //imported.map((r) => {
            //console.log(r);
            importedRoom = {
              listingType: r.listingType,
              address: r.addressId,
              description: r.description,
              image: r.image,
              street: a.street,
              city: a.city,
              state: a.state,
              contactNumber: r.contactNumber,
              petsAllowed: r.petsAllowed,
              datePosted: new Date(r.datePosted).toLocaleString(),
              creatorId: r.user
            };
             //console.log(importedRoom);
            importedRooms.push(importedRoom);
          });
          //  console.log(importedRooms);
          Promise.all(requests).then(() => {
            if (importedRooms.length > value.length) {
              setValue(importedRooms);
              importedRooms = [];
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  getRoommates();

  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <Navbar />
      <div>
        <CitySelect />
        <Container maxWidth='lg'>
          <h2> Room Listings Around You</h2>
          <Create render={() => getRoommates()} />
          <br />
          <Grid container className={useStyles.gridContainer} spacing={2}>
            {value.map((roommate) => {
              return (
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Card roommate={roommate} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Roommates;
