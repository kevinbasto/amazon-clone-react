import React from 'react'
import './Item.css'
import { useStateValue } from './StateProvider'

function Item({id, title, image, price, rating, hideButton}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    };

    return (
        <div className="item">
            <img src={image} alt={title}/>
            <div className="item__data" >
                <h2>{title}</h2>
                <small>$</small>
                <strong>{price}</strong>
                <div className="item__rating" >
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>) )}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket} >Delete from basket</button>
                )}
            </div>
        </div>
    )
}


export default Item
