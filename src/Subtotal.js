import React from 'react'
import CurrencyFormat from 'react-currency-format'
import "./Subtotal.css";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value)=> (
                    <>
                    <p>
                        {/*part of the homework*/}
                        subtotal ({basket.length} items): <strong>{value}</strong> 
                    </p>
                    
                    <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)} //part to the homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={ e => history.push('/payment')} >Proceed to checkout</button>
        </div>
    )
}

export default Subtotal
