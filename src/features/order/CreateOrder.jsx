/* eslint-disable react/prop-types */
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';

const ORDERS_ENDPOINT = 'http://localhost:8000/orders';

//Phone number validation
const isValidPhoneNumber = (tel) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        tel,
    );

function CreateOrder() {
    const firstName = useSelector((store) => store.user.firstName);
    const lastName = useSelector((store) => store.user.lastName);
    const fullName = `${firstName} ${lastName}`;
    const { cart } = useSelector((store) => store.cart);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    //For catching errors in phone number
    const formErrors = useActionData();

    return (
        <div className="mt-9 text-center">
            <h1 className="mb-3 text-2xl font-semibold">Ready to order ? </h1>
            <Form method="post" className="m-[0_auto] max-w-md space-y-2">
                {/* <Input type="text">FullName</Input> */}
                <div className="max-w-full">
                    <label htmlFor="fullname" className="block font-semibold">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        defaultValue={fullName}
                        required
                        className="block w-full rounded-md border-2 border-neutral-400 px-2 py-0.5 focus:outline-none"
                    />
                </div>

                {/* <Input type="tel">Phone Number</Input> */}
                <div className="max-w-full">
                    <label htmlFor="tel" className="block font-semibold">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="tel"
                        id="tel"
                        required
                        className="block w-full rounded-md border-2 border-neutral-400 px-2 py-0.5 focus:outline-none"
                    />
                </div>
                {formErrors?.tel && (
                    <p className="text-red-500">{formErrors.tel}</p>
                )}

                {/* <Input type="text">Address</Input> */}
                <div className="max-w-full">
                    <label htmlFor="address" className="block font-semibold">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        className="block w-full rounded-md border-2 border-neutral-400 px-2 py-0.5 focus:outline-none"
                    />
                </div>

                <div className="space-x-2">
                    <input
                        name="priority"
                        id="priority"
                        type="checkbox"
                        className="h-4 w-4 accent-green-300"
                    />
                    <label htmlFor="priority">
                        Want to add priority to your order ?
                    </label>
                </div>

                <div>
                    {/* hidden input element to pass in the cart data */}
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button disabled={isSubmitting}>
                        {isSubmitting ? 'Placing order....' : 'Order Now'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

//Create new orders
async function createOrder(newOrder) {
    try {
        const response = await fetch(`${ORDERS_ENDPOINT}`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error();

        const data = await response.json();

        return data;
    } catch {
        throw new Error('Failed to create new order!');
    }
}

//Action function
export async function action({ request }) {
    const formData = await request.formData();
    //   console.log(formData);
    const data = Object.fromEntries(formData);
    //   console.log(data);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on',
    };
    // console.log(order);

    //handle form error - phone number error
    const errors = {};
    if (!isValidPhoneNumber(order.tel))
        errors.tel = 'Please enter correct phone number';

    if (Object.keys(errors).length > 0) return errors;

    //if everything is okay create new order and redirect
    const newOrder = await createOrder(order);

    //Clearing cart on order creation - not to overuse as it creates performance isses
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
