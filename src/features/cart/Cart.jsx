import { Link, useFetcher, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import { convertCurrency } from '../../services/helpers';
import { useEffect } from 'react';

function Cart() {
    const firstName = useSelector((store) => store.user.firstName);
    const lastName = useSelector((store) => store.user.lastName);
    const cart = useSelector(getCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleClick() {
        navigate('/order/new');
    }

    function handleClearCart() {
        dispatch(clearCart());
    }

    //Fetching data from other routes without navigation
    const fetcher = useFetcher();

    useEffect(
        function () {
            if (fetcher.state === 'idle' && !fetcher.data)
                fetcher.load('/menu');
        },
        [fetcher],
    );

    // console.log(fetcher.data);

    return (
        <div className="py-6">
            <Link
                to="/menu"
                className="font-semibold tracking-tighter text-blue-600 transition-all hover:text-blue-800"
            >
                &larr; Go to menu
            </Link>
            <div className="mt-7">
                <h1 className="text-2xl font-semibold">
                    Your Cart, {firstName} {lastName}
                </h1>
                {cart.length === 0 ? (
                    <p className="mt-3 text-red-500">
                        Your cart is empty. Go to menu and place an order!!
                    </p>
                ) : (
                    <>
                        <ul className="mt-6 flex flex-col gap-1 rounded bg-neutral-300">
                            {cart.map((item) => (
                                <CartItem
                                    item={item}
                                    key={item.pizzaId}
                                    ingredients={
                                        fetcher?.data?.find(
                                            (el) => el.id === item.pizzaId,
                                        ).ingredients
                                    }
                                    ingredientsLoading={fetcher.state}
                                />
                            ))}
                        </ul>

                        <div>
                            <p className="mt-4 inline-block rounded-sm bg-orange-300 px-4 py-2 tracking-tight">
                                <span>Total Cart Price: </span>
                                <span className="font-semibold">
                                    {convertCurrency(
                                        cart
                                            .map((item) => item.totalPrice)
                                            .reduce(
                                                (prev, curr) => prev + curr,
                                                0,
                                            ),
                                    )}
                                </span>
                            </p>
                        </div>

                        <div className="space-x-6">
                            <Button onclick={handleClick}>Order Pizza</Button>
                            <button
                                className="rounded border-2 border-neutral-600 bg-transparent px-2 py-1"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;
