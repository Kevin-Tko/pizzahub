import { useSelector } from 'react-redux';

function Username() {
    const firstName = useSelector((store) => store.user.firstName);
    const lastName = useSelector((store) => store.user.lastName);

    if (!firstName || !lastName) return null;

    return (
        <div>
            <p className="hidden text-sm font-semibold sm:block">
                Welcome, {firstName} {lastName}
            </p>
        </div>
    );
}

export default Username;
