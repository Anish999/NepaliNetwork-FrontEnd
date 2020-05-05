import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventDetails from '../../shared/components/CreateDialog/EventDetails';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.event.image}
          title={props.event.title}
          square
          imageUrl={props.event.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            color='textSecondary'
            variant='h5'
            component='h2'
          >
            {props.event.title}
          </Typography>
          <Typography
            gutterBottom
            color='textSecondary'
            variant='body2'
            component='p'
          >
            -{props.event.street}, {props.event.city}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {props.event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <EventDetails eventInfo={props.event} />
      </CardActions>
    </Card>
  );
}
