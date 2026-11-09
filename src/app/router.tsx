import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { HotelDetailsPage } from '../pages/HotelDetailsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { BookingConfirmationPage } from '../pages/BookingConfirmationPage';
import { MyBookingsPage } from '../pages/MyBookingsPage';
import { ReceptionDashboardPage } from '../pages/reception/ReceptionDashboardPage';
import { ManagerDashboardPage } from '../pages/manager/ManagerDashboardPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'hotel/:id',
        element: <HotelDetailsPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'booking/confirmed/:bookingId',
        element: <BookingConfirmationPage />,
      },
      {
        path: 'my-bookings',
        element: <MyBookingsPage />,
      },
      {
        path: 'dashboard/reception',
        element: <ReceptionDashboardPage />,
      },
      {
        path: 'dashboard/manager',
        element: <ManagerDashboardPage />,
      },
      {
        path: 'dashboard/admin',
        element: <AdminDashboardPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

