import { useLoaderData } from 'react-router-dom';
import MenuItem from './MenuItem';

const API_ENDPOINT = 'https://react-fast-pizza-api.onrender.com/api';

function Menu() {
    const pizzaMenu = useLoaderData();

    return (
        <ul className="grid grid-cols-4 gap-4 py-5">
            {pizzaMenu.map((pizza) => (
                <MenuItem pizza={pizza} key={pizza.id} />
            ))}
        </ul>
    );
}

//Getting menu data from the API
async function getMenuData() {
    const response = await fetch(`${API_ENDPOINT}/menu`);

    if (!response.ok) throw new Error('Failed to fetch menu data');

    const { data } = await response.json();
    return data;
}

// loader function
export async function loader() {
    const menuData = await getMenuData();
    return menuData;
}

export default Menu;
