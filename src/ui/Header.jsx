import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
    return (
        <header className="flex flex-col items-center justify-between gap-0 space-y-3 bg-green-500 px-4 py-6 uppercase sm:flex-row sm:space-y-0">
            <Link to="/" className="font-bold tracking-tight sm:tracking-wider">
                🍕 Pizza Hub Company Limited
            </Link>
            <SearchOrder />
            <Username />
        </header>
    );
}

export default Header;
