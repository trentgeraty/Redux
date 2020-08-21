import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
// Success function 
function Success() {

    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
    async function saveOrder() {

        const cart = await idbPromise('cart', 'get');
        const products = cart.map(item => item._id);

        if (products.length) {
            const { data } = await addOrder({ variables: { products } });
            const productData = data.addOrder.products;
          
            productData.forEach((item) => {
              idbPromise('cart', 'delete', item);
            });
          }

    }
    // Save and add orders
    saveOrder();


    }, [addOrder]);

    setTimeout(function(){ alert(""); }, 3000);
    window.location.assign('/')

    // Return messages to user thanking them for business
    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you! We appreciate your business!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
  };

export default Success;