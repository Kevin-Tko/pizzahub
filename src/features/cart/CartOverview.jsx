import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertCurrency } from '../../services/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
    const cartPrice = useSelector(getTotalCartPrice);
    const totalCartQuantity = useSelector(getTotalCartQuantity);

    if (!totalCartQuantity) return null;

    return (
        <div className="flex items-center justify-between bg-neutral-800 px-5 py-5 uppercase text-neutral-200">
            <p className="space-x-6 font-semibold text-neutral-400">
                <span>{totalCartQuantity} Pizzas</span>
                <span>{convertCurrency(cartPrice)}</span>
            </p>

            <Link to="/cart">Open Cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
