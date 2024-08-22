import React, { useReducer } from 'react';
import './Shop.css';
import apple from './images/apple.jpg'
import banana from './images/banana.jpg';
import orange from './images/orange.webp';
import grapes from './images/grapes.jpg';
import mango from './images/mongo.jpg';

const fruits = [
    {
        id: 1,
        name: 'Kashmir Apple',
        image: apple,
        price: 100,
    },
    {
        id: 2,
        name: 'Banana',
        image: banana,
        price: 40,
    },
    {
        id: 3,
        name: 'Orange',
        image: orange,
        price: 30,
    },
    {
        id: 4,
        name: 'Grapes',
        image: grapes,
        price: 60,
    },
    {
        id: 5,
        name: 'Mango',
        image: mango,
        price: 120,
    },
];


const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }],
            };
        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};

const initialState = {
    cart: [],
};

const Shop = () => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItemToCart = (fruit) => {
        const existingItem = state.cart.find(item => item.id === fruit.id);
        if (existingItem) {
            dispatch({ type: 'INCREMENT_QUANTITY', payload: fruit.id });
        } else {
            dispatch({ type: 'ADD_ITEM', payload: fruit });
        }
    };

    const incrementQuantity = (id) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
    };

    const decrementQuantity = (id) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
    };

    const removeItemFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    return (
        <div className="fruit-list">
            <h2>Groceries</h2>
            <div className="fruit-container">
                {fruits.map(fruit => (
                    <div key={fruit.id} className="fruit-card">
                        <img src={fruit.image} alt={fruit.name} />
                        <p className="fruit-name">{fruit.name}</p>
                        <p className="fruit-price">₹{fruit.price}</p>
                        <div className="quantity-controls">
                            <button onClick={() => decrementQuantity(fruit.id)}>-</button>
                            <span>{state.cart.find(item => item.id === fruit.id)?.quantity || 0}</span>
                            <button onClick={() => incrementQuantity(fruit.id)}>+</button>
                        </div>
                        <button onClick={() => addItemToCart(fruit)} className="add-button">
                            {state.cart.find(item => item.id === fruit.id) ? 'Update' : 'Add'}
                        </button>
                        <button onClick={() => removeItemFromCart(fruit.id)} className="remove-button">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3>Cart Summary</h3>
                {state.cart.length > 0 ? (
                    state.cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <p>{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ₹{item.quantity * item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Shop;
