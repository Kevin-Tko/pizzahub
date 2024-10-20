/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { convertCurrency } from '../../services/helpers';
import Button from '../../ui/Button';
import { addItem } from '../cart/cartSlice';

export default function MenuItem({ pizza }) {
    const { id, name, unitPrice, imageUrl, ingredients, soldOut } = pizza;
    const { cart } = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    //checking if the cart already contains an item that we try to add
    const isInCart = cart.some((item) => item.pizzaId === id);

    function handleAddItem() {
        const pizzaItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        };

        if (isInCart) return;
        dispatch(addItem(pizzaItem));
    }

    return (
        <li className="flex grow flex-col items-start gap-4 rounded bg-neutral-300 shadow-2xl transition-all duration-500 hover:translate-y-2 hover:cursor-pointer">
            <img
                src={imageUrl}
                alt={name}
                className={`inline-block h-56 self-center rounded pt-3 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex flex-col justify-between gap-2 px-4 pb-4">
                <p className="text-base font-bold text-neutral-900">{name}</p>
                <p className="text-sm">{ingredients.join(', ')}</p>

                <p className="font-extrabold text-green-500">
                    {soldOut ? (
                        <span className="text-red-500">Soldout</span>
                    ) : (
                        convertCurrency(unitPrice)
                    )}
                </p>
                <div>
                    {isInCart ? (
                        <Button disabled={isInCart}>Item in cart</Button>
                    ) : (
                        !soldOut && (
                            <Button onclick={handleAddItem}>Add to Cart</Button>
                        )
                    )}
                </div>
            </div>
        </li>
    );
}
