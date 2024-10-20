import CreateUserForm from '../features/user/CreateUserForm';
import { useSelector } from 'react-redux';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const firstName = useSelector((store) => store.user.firstName);
    const lastName = useSelector((store) => store.user.lastName);
    const navigate = useNavigate();

    return (
        <div className="mb-9 mt-9">
            <h1 className="mb-6 text-center text-xl font-semibold sm:text-2xl">
                Hello, welcome to the homepage.
                <br />
                <span className="text-green-500">
                    Hidden gem for the best oven baked Pizzas in town.
                </span>
            </h1>
            <div className="text-center">
                {!firstName || !lastName ? (
                    <CreateUserForm />
                ) : (
                    <Button onclick={() => navigate('/menu')}>
                        Go to Menu
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Home;
