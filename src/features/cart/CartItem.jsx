/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { convertCurrency } from '../../services/helpers';
import Button from '../../ui/Button';
import {
    decreaseItemQuantity,
    increaseItemQuantity,
    deleteItem,
} from './cartSlice';

function CartItem({ item, ingredients, ingredientsLoading }) {
    // console.log(ingredients);
    const { pizzaId, name, quantity, totalPrice } = item;
    const dispatch = useDispatch();

    function handleIncreaseItems() {
        dispatch(increaseItemQuantity(pizzaId));
    }

    function handleDecreaseItems() {
        dispatch(decreaseItemQuantity(pizzaId));
    }

    function handleDeleteItems() {
        dispatch(deleteItem(pizzaId));
    }

    return (
        <li className="flex items-center justify-between p-6 shadow-md">
            <div>
                <p className="text-lg font-semibold">Item: {name}</p>
                <p>Quantity: {quantity}</p>
                <p className="text-sm capitalize italic">
                    Ingredients:{' '}
                    {ingredientsLoading === 'loading'
                        ? 'Loading....'
                        : ingredients?.join(', ')}
                </p>
                <p className="text-sm font-bold text-green-500">
                    Total Price: {convertCurrency(totalPrice)}
                </p>
            </div>
            <div>
                <div className="flex flex-row justify-around">
                    <button
                        className="rounded bg-green-500 px-2 text-lg text-neutral-100 hover:bg-green-300 hover:text-neutral-700"
                        onClick={handleIncreaseItems}
                    >
                        +
                    </button>
                    <button
                        className="rounded bg-red-500 px-2 text-lg text-neutral-100 hover:bg-red-300 hover:text-neutral-700"
                        onClick={handleDecreaseItems}
                    >
                        -
                    </button>
                </div>
                <Button onclick={handleDeleteItems}>Delete Item</Button>
            </div>
        </li>
    );
}

export default CartItem;
