import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RoommateDetails from '../../shared/components/CreateDialog/RoommateDetails';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.roommate.image}
          title={props.roommate.title}
          square
          imageUrl={props.roommate.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            color='textSecondary'
            variant='h5'
            component='h2'
          >
            {props.roommate.listingType} Bedroom Apartment
          </Typography>
          <Typography
            gutterBottom
            color='textSecondary'
            variant='body2'
            component='p'
          >
            -{props.roommate.location}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.roommate.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <RoommateDetails roommateInfo={props.roommate} />

      </CardActions>
    </Card>
  );
}
