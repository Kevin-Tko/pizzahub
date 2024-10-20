import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!orderId) return;
        navigate(`/order/${orderId}`);
        setOrderId('');
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    className="rounded-l-md border-0 bg-green-100 px-1 py-0.5 transition-all duration-1000 placeholder:text-neutral-400 focus:w-72 focus:outline-none"
                    type="search"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="search...."
                />
                <button
                    type="search"
                    className="rounded-r-md border-0 bg-green-400 px-2 py-0.5 text-neutral-700 focus:outline-none"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchOrder;
