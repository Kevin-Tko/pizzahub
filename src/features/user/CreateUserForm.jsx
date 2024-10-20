/* eslint-disable react/prop-types */
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';
import { updateFirstName, updateLastName } from './userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// const CUSTOMERS_ENDPOINT = 'http://localhost:8000/customers';

function CreateUserForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleCreateUser(e) {
        e.preventDefault();

        if (!firstName || !lastName) return;

        dispatch(updateFirstName(firstName));
        dispatch(updateLastName(lastName));
        setFirstName('');
        setLastName('');
        navigate('/menu');
    }

    return (
        <div className="text-center">
            <p className="mb-2">
                Hello, please fill in your first and last name
            </p>

            <form className="space-y-3">
                <div>
                    <label htmlFor="firstname" className="block">
                        First Name
                    </label>
                    <input
                        className="rounded border-0 px-1 py-0.5 focus:outline-none"
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="lastname" className="block">
                        Last Name
                    </label>
                    <input
                        className="rounded border-0 px-1 py-0.5 focus:outline-none"
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {firstName && lastName && (
                    <div className="mt-8">
                        <Button onclick={handleCreateUser}>
                            Start ordering
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}

// async function createCustomer(customer) {
//     try {
//         const response = await fetch(`${CUSTOMERS_ENDPOINT}`, {
//             method: 'POST',
//             body: JSON.stringify(customer),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (!response.ok) throw new Error();

//         const data = await response.json();
//         return data;
//     } catch {
//         throw new Error('Failed to create new customer');
//     }
// }

// export async function action({ request }) {
//     const formData = await request.formData();
//     const customer = Object.fromEntries(formData);

//     await createCustomer(customer);

//     return redirect('/menu');
// }

export default CreateUserForm;
