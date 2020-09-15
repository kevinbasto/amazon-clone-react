export const initialState = {
    basket: [],
    user: null,
}

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: removeFromBasket(state.basket, action.item)
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        default: 
            return state;
    }
}


function removeFromBasket(basket, item){
    console.log(item);
    let newBasket = [];
    let deleted = 0;
    basket.forEach(element => {

        if(element.id != item.id)
            newBasket.push(element);
        else if (deleted == 0)
            deleted++;
        else
            newBasket.push(element);
        
    })
    console.log(newBasket);
    return newBasket;
}

export default reducer