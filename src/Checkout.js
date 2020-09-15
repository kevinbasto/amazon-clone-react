import React from 'react'
import './checkout.css';
import Subtotal from './Subtotal';
import Item from './Item';
import { useStateValue } from './StateProvider';

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" 
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" />
                <div>
                    <h3>{user?.email}</h3>
                    <h2 className="checkout__title" >
                        Your shopping Basket
                    </h2>
                    <div className="checkout__basket">
                        {getItemsList(basket)}
                    </div>
                </div>
            </div>
            
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

function getItemsList(basket){
    let items = [];
    basket.forEach(element => {
        items.push( <Item 
            id = {element.id}
            title = {element.title}
            price = {element.price}
            image = {element.image}
            rating = {element.rating}
        /> )
    });

    if(items.length > 0)
        return items;
    else
        return (<h2>no items in the basket</h2>)
}

export default Checkout
