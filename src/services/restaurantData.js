const API_ENDPOINT = 'https://react-fast-pizza-api.onrender.com/api';
const ORDERS_ENDPOINT = 'http://localhost:8000/orders';

export async function getMenuData() {
    const response = await fetch(`${API_ENDPOINT}/menu`);

    if (!response.ok) throw new Error('Failed to fetch menu data');

    const { data } = await response.json();
    return data;
}

export async function getOderData(id) {
    const response = await fetch(`${ORDERS_ENDPOINT}/${id}`);

    if (!response.ok) throw new Error('Failed to fetch order data');

    const data = await response.json();

    return data;
}

export async function createOrder(newOrder) {
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

export function totalPrice(cart) {
    const prices = cart
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
    return prices;
}

export function totalPriceWithPriority(cart) {
    const priorityPrice = totalPrice(cart) + 30;
    return priorityPrice;
}
