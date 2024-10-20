import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* checking the loading status of the whole application */}
      {isLoading && <LoadingSpinner />}
      {/* {true && <LoadingSpinner />} */}

      <Header />
      <div className="overflow-auto">
        <main className="m-[0_auto] max-w-5xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
