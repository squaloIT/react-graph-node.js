import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    // minWidth: 275,
    // maxWidth: '100%',
    boxShadow: '3px 3px 12px #ccc',
    '&:hover': {
      boxShadow: '3px 3px 12px #666'
    },
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 12
  },
  pos: {
    marginBottom: 12,
  },
  iconSize: {
    fontSize: 35,
    position: "absolute",
    bottom: 10
  }
});

const ShoppingCartItem = props => {
  const classes = useStyles();

  const removeFromCart = (productId) => {

  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.productName}
          </Typography>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.productCode}
          </Typography>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.standardCost}$
          </Typography>
        </CardContent>
        <IconButton aria-label="Remove from cart" onClick={() => removeFromCart(props.productId)}>
          <DeleteIcon className={classes.iconSize} color="secondary" />
        </IconButton>
      </Card>
    </div>
  );
};

export default ShoppingCartItem;