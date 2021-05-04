export const initialState = {
    basket: [],
    user: null
}

const reducer = (state, action) => {

    let item = {};
    let newArray=[];

    switch (action.type) {

        case "ADD_TO_BASKET":

            //If it existed in the basket increase the counter

            if (state.basket.find(e => e.item.id === action.item.id)) {
                newArray = [...state.basket];
                item = newArray.find(e => e.item.id === action.item.id);
                console.log(item.count)
                item.count += 1;
                console.log(item.count)

                return {
                    ...state,
                    basket: [...newArray]
                };
            }

            return {
                ...state,
                basket: [...state.basket, { item: action.item, count: 1 }]
            }

        case "REMOVE_FROM_BASKET":
            return {
                ...state,
                basket: [...state.basket.filter(p => p.item.id !== action.item.id)]
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }

        case "DECREASE_COUNT":
            newArray = [...state.basket];
            item = newArray.find(product =>(product.item.id == action.id));
            item.count -= 1;

            return {
                ...state,
                basket:[...newArray]
            }

        case "INCREASE_COUNT":
            newArray = [...state.basket];
            item = newArray.find(product =>(product.item.id == action.id));
            item.count += 1;

            return {
                ...state,
                basket:[...newArray]
            }

        default:
            return state;
    }
}

export function getBasketTotal(basket) {
    const finaltotal = basket.reduce((_total, currentItem) => {
        _total += +currentItem.item.price * currentItem.count;
        return _total;
    }, 0)

    return finaltotal;
}


export default reducer;