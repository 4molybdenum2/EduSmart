import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

const posts = [
    {
        title: "Some title",
        description: "Some description",
    },
    {
        title: "Some title",
        description: "Some description",
    },
    {
        title: "Some title",
        description: "Some description",
    }
]

export default function Assignment() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      {posts.map((post) => (
          <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Submit
            </Button>
            <Button size="small" color="primary">
              Info
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

Assignment.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};