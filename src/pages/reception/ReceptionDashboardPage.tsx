import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  CheckCircle, 
  Key, 
  LogOut, 
  Clock, 
  Utensils, 
  Phone, 
  QrCode,
  Building,
  AlertCircle
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStatus } from '../../features/hotels/hotelsSlice';
import { formatCurrency, formatDisplayDate } from '../../utils/formatters';

export const ReceptionDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookings = useAppSelector((state) => state.hotels.bookings);
  const hotels = useAppSelector((state) => state.hotels.hotels);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBookingForCheckIn, setSelectedBookingForCheckIn] = useState<string | null>(null);
  const [roomNumberInput, setRoomNumberInput] = useState('304');

  // Filter bookings for reception desk
  const filteredBookings = bookings.filter((b) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      b.bookingReference.toLowerCase().includes(term) ||
      b.guest.firstName.toLowerCase().includes(term) ||
      b.guest.lastName.toLowerCase().includes(term) ||
      b.guest.phone.toLowerCase().includes(term) ||
      b.hotelName.toLowerCase().includes(term)
    );
  });

  const handleCheckIn = (bookingId: string) => {
    dispatch(
      updateStatus({
        bookingId,
        status: 'checked_in',
        roomNumber: roomNumberInput.trim() ? `Room ${roomNumberInput.trim()}` : undefined
      })
    );
    setSelectedBookingForCheckIn(null);
  };

  const handleCheckOut = (bookingId: string) => {
    dispatch(
      updateStatus({
        bookingId,
        status: 'checked_out'
      })
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Reception Header */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Front-Desk Reception Terminal
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-100">
                Guest Arrival, Key Assignment & Check-Out
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-300">
            <span className="bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
              Terminal Active · Ready for Arrivals
            </span>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Booking Reference (e.g. AST-2026), Guest Name, or Mobile Phone..."
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Bookings Table for Reception */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Arrivals & Guest Directory ({filteredBookings.length})
            </h3>
            <span className="text-xs text-stone-400">Live PMS synchronization</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="px-5 py-3">Reference / Hotel</th>
                  <th className="px-5 py-3">Guest Info</th>
                  <th className="px-5 py-3">Room & Dates</th>
                  <th className="px-5 py-3">Meal Plan Entitlement</th>
                  <th className="px-5 py-3">Status / Assigned Room</th>
                  <th className="px-5 py-3 text-right">Desk Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                    {/* Ref & Hotel */}
                    <td className="px-5 py-4">
                      <div className="font-mono font-bold text-stone-900">{b.bookingReference}</div>
                      <div className="text-[11px] text-stone-500 font-medium">{b.hotelName}</div>
                      <div className="text-[10px] text-stone-400">{b.hotelCity}</div>
                    </td>

                    {/* Guest info */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-stone-900">
                        {b.guest.title}. {b.guest.firstName} {b.guest.lastName}
                      </div>
                      <div className="text-stone-500 flex items-center gap-1 text-[11px]">
                        <Phone className="w-3 h-3 text-stone-400" />
                        {b.guest.phone}
                      </div>
                      {b.guest.specialRequests && (
                        <div className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded w-fit mt-1">
                          Req: {b.guest.specialRequests}
                        </div>
                      )}
                    </td>

                    {/* Room & Dates */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-stone-900">{b.roomTypeName}</div>
                      <div className="text-stone-500 text-[11px]">
                        {formatDisplayDate(b.checkInDate, 'dd MMM')} → {formatDisplayDate(b.checkOutDate, 'dd MMM')} ({b.nights}N)
                      </div>
                      <div className="text-[10px] text-stone-400">{b.adultsCount} Adults · {b.roomsCount} Room</div>
                    </td>

                    {/* Meal Plan */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-amber-900 flex items-center gap-1">
                        <Utensils className="w-3 h-3 text-amber-600" />
                        {b.mealPlanName}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {b.includedMeals.join(', ') || 'No Meals Included'}
                      </div>
                    </td>

                    {/* Status & Key */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-amber-100 text-amber-900'
                            : b.bookingStatus === 'checked_in'
                            ? 'bg-emerald-100 text-emerald-900 font-extrabold'
                            : b.bookingStatus === 'checked_out'
                            ? 'bg-stone-200 text-stone-700'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {b.bookingStatus.replace('_', ' ')}
                      </span>
                      {b.allocatedRoomNumber && (
                        <div className="text-xs font-mono font-bold text-emerald-800 mt-1 flex items-center gap-1">
                          <Key className="w-3 h-3" /> {b.allocatedRoomNumber}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      {b.bookingStatus === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => setSelectedBookingForCheckIn(b.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
                        >
                          Check In & Key
                        </button>
                      )}

                      {b.bookingStatus === 'checked_in' && (
                        <button
                          type="button"
                          onClick={() => handleCheckOut(b.id)}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-bold text-xs shadow-xs transition-colors flex items-center gap-1 ml-auto"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Check Out</span>
                        </button>
                      )}

                      {b.bookingStatus === 'checked_out' && (
                        <span className="text-stone-400 text-[11px] italic">Completed</span>
                      )}

                      {b.bookingStatus === 'cancelled' && (
                        <span className="text-rose-400 text-[11px] italic">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Check-In Key Assignment Modal */}
        {selectedBookingForCheckIn && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <Key className="w-5 h-5" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Assign Room & Check In
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Physical Room Number / Suite Key
                </label>
                <input
                  type="text"
                  value={roomNumberInput}
                  onChange={(e) => setRoomNumberInput(e.target.value)}
                  placeholder="e.g. 304, Villa 12, Suite 402"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm font-bold font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                Staff note: Verify ID card before handing over electronic key card.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBookingForCheckIn(null)}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleCheckIn(selectedBookingForCheckIn)}
                  className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
                >
                  Confirm Check-In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

