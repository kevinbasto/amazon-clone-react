import React, { useState, useEffect } from 'react'
import "./Order.css"
import Item from './Item'
import moment from 'moment'
import { useStateValue } from './StateProvider'
import CurrencyFormat from 'react-currency-format'

function Order({order}) {
    const [ { basket, user }, dispatch ] = useStateValue();
    const [orders, setOrders ] =useState([])

    return (
        <div className="order">
            <h2>Order</h2>
            <p> {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")} </p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <Item 
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton={true}
                />
            ))}
            <CurrencyFormat 
                renderText = {(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount/100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default Order
