import { useLoaderData, useNavigate } from 'react-router-dom';
import { convertCurrency } from '../../services/helpers';
import {
    totalPrice,
    totalPriceWithPriority,
} from '../../services/restaurantData';
import Button from '../../ui/Button';

const ORDERS_ENDPOINT = 'http://localhost:8000/orders';

function Order() {
    const navigate = useNavigate();
    const orderData = useLoaderData();
    const { id, fullname, tel, priority, cart } = orderData;
    const cartTotal = totalPrice(cart);
    console.log(cartTotal);
    const priorityPrice = 30;
    const priorityOrderCost = totalPriceWithPriority(cart);

    return (
        <div className="m-[0_auto] mt-11 flex max-w-2xl flex-col gap-6 rounded-md bg-neutral-200 p-5 shadow-2xl">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Status of order number <span>{id}</span>
                </h2>
                <p
                    className={`rounded px-3 py-1 ${priority ? 'bg-red-500' : 'bg-green-500'}`}
                >
                    Prority: {priority ? 'High' : 'Normal'}
                </p>
            </div>
            <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center justify-between rounded bg-neutral-400 px-4 py-2">
                    <p>Customer: {fullname}</p>
                    <p>Telephone: {tel}</p>
                </div>

                <ul className="space-y-2">
                    {cart.map((item) => (
                        <li
                            key={item.pizzaId}
                            className="flex items-center justify-between"
                        >
                            <p>
                                {item.quantity}&times; {item.name}
                            </p>
                            <p className="font-semibold">
                                {convertCurrency(item.totalPrice)}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="space-y-2 rounded bg-neutral-400 px-4 py-2">
                    <p>Price: {convertCurrency(cartTotal)}</p>
                    <p>
                        {priority && (
                            <span>
                                Priority price: {convertCurrency(priorityPrice)}
                            </span>
                        )}
                    </p>
                    <p className="font-bold">
                        Total price:{' '}
                        {priority
                            ? convertCurrency(priorityOrderCost)
                            : convertCurrency(cartTotal)}
                    </p>
                </div>
                <div>
                    <Button onclick={() => navigate(-3)}>Go to Menu</Button>
                </div>
            </div>
        </div>
    );
}

//Getting order data
async function getOderData(id) {
    const response = await fetch(`${ORDERS_ENDPOINT}/${id}`);

    if (!response.ok) throw new Error('Failed to fetch order data');

    const data = await response.json();
    return data;
}

//Loader function
export async function loader({ params }) {
    const orderData = await getOderData(params.orderId); //params.orderId gets the orderID from the url. orderId how the URL was defined
    return orderData;
}

export default Order;
