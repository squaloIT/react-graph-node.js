import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import React from 'react';
import config from './../../../../config';
import './ShoppingCartItem.css';
import tokenFunc from './../../../../utils/token'

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    // minWidth: 275,
    // maxWidth: '100%',
    minHeight: 200,
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '3px 3px 12px #ccc',
    '&:hover': {
      boxShadow: '3px 3px 12px #666'
    },
  },
  title: {
    fontSize: 16,
    textTransform: "uppercase",
    marginBottom: 12,
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12,
  },
  iconSize: {
    fontSize: 35,
    // height: 50
    // marginRight: 20
  }
});

const ShoppingCartItem = props => {
  const classes = useStyles();
  const userId = tokenFunc.decodeJWTFromLocalStorageAndReturnData().id;

  const removeFromCart = async (productId) => {
    console.log(productId);
    const res = await axios.delete(`${config.serverUrl}/user/delete-item/${productId}`,
      {
        headers: tokenFunc.getHeaderWithToken(tokenFunc.getAuthDataFromLocalStorage())
      });
    console.log(res);
  }

  return (
    <div className='col-md-6 mb-20'>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.productName}
          </Typography>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.productCode} -  <b>{props.standardCost}$</b>
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