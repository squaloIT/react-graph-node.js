import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import jwt from 'jsonwebtoken';
import React from 'react';
import socketIOClient from "socket.io-client";
import tokenFunctions from '../../../../utils/token';
import config from './../../../../config';
import './ProductItem.css';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: '100%',
    minHeight: 200,
    display: "flex",
    justifyContent: 'space-between',
    flexDirection: 'column',
    boxShadow: '3px 3px 12px #ccc',
    '&:hover': {
      boxShadow: '3px 3px 12px #666'
    },
  },
  title: {
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 12
  },
  pos: {
    marginBottom: 12,
  },
  iconSize: {
    fontSize: 50,
    position: "absolute",
    bottom: 10
  }
});

const ProductItem = (props) => {
  const classes = useStyles();
  const socket = socketIOClient(config.serverUrl);

  const addToCart = (productId) => {
    const token = tokenFunctions.getAuthDataFromLocalStorage()
    const userData = jwt.decode(token.idToken);
    console.log(socket)
    socket.emit(
      "addProduct",
      { headers: tokenFunctions.getHeaderWithToken(token), product_id: productId, user_id: userData.id }
    );

    // axios.post(`${config.serverUrl}/products/add`,
    //   {
    //     user_id: userData.id,
    //     product_id: productId
    //   },
    //   {
    //     headers: tokenFunctions.getHeaderWithToken(token)
    //   }
    // )
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })


  }

  return (
    <div className='col-md-3 card-margin'>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            {props.productName}
          </Typography>
          <Typography variant="h5" component="h2">
            {props.standardCost} $
          </Typography>
          <Typography variant="body2" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(props.productId)}>
          <AddShoppingCartIcon className={classes.iconSize} />
        </IconButton>
      </Card>
    </div>
  );
};

export default ProductItem;