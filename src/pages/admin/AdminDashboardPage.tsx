import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Users, 
  Percent, 
  CheckCircle2, 
  Clock, 
  FileText,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { formatCurrency, formatDisplayDate } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const hotels = useAppSelector((state) => state.hotels.hotels);
  const bookings = useAppSelector((state) => state.hotels.bookings);

  const [platformCommissionRate, setPlatformCommissionRate] = useState(15); // 15%

  const totalGrossBookings = bookings
    .filter((b) => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.pricing.grandTotal, 0);

  const platformEarnings = Math.round((totalGrossBookings * platformCommissionRate) / 100);

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
                Platform Super Admin Console
              </div>
              <h1 className="font-serif text-2xl font-bold text-stone-100">
                AuraStays Multi-Hotel Network Overview
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-stone-800 p-2 rounded-xl border border-stone-700 text-xs">
            <Percent className="w-4 h-4 text-indigo-400" />
            <span className="text-stone-300">Commission Rate:</span>
            <input
              type="number"
              min="5"
              max="30"
              value={platformCommissionRate}
              onChange={(e) => setPlatformCommissionRate(Number(e.target.value))}
              className="w-14 bg-stone-900 text-white px-2 py-1 rounded border border-stone-600 font-bold text-center"
            />
            <span className="text-stone-400">%</span>
          </div>
        </div>

        {/* 4 Big Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Platform Gross Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {formatCurrency(totalGrossBookings)}
            </div>
            <div className="text-[11px] text-stone-400">Total settled & active bookings</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>AuraStays Net Commission</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-indigo-950">
              {formatCurrency(platformEarnings)}
            </div>
            <div className="text-[11px] text-indigo-700 font-medium">At {platformCommissionRate}% take rate</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Verified Hotel Properties</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {hotels.length} Active
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">100% compliance verified</div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-1">
            <div className="text-xs text-stone-500 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Platform Bookings</span>
              <Activity className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              {bookings.length} reservations
            </div>
            <div className="text-[11px] text-stone-400">Across all network hotels</div>
          </div>
        </div>

        {/* Multi-Hotel Status Overview */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Network Hotel Partner Directory & Approvals
            </h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md">
              All 6 Properties Approved
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="px-5 py-3">Property Name</th>
                  <th className="px-5 py-3">Category & Type</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Room Types</th>
                  <th className="px-5 py-3">Inventory Capacity</th>
                  <th className="px-5 py-3 text-right">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {hotels.map((h) => {
                  const totalCapacity = h.roomTypes.reduce((s, r) => s + r.totalInventoryUnits, 0);
                  const availableCapacity = h.roomTypes.reduce((s, r) => s + r.availableUnits, 0);

                  return (
                    <tr key={h.id} className="hover:bg-stone-50/70">
                      <td className="px-5 py-3.5 font-bold text-stone-900 flex items-center gap-2">
                        <img src={h.heroImage} alt={h.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{h.name}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-semibold capitalize">
                          {h.category}
                        </span>
                        <span className="text-stone-400 block text-[10px] mt-0.5">{h.propertyType}</span>
                      </td>
                      <td className="px-5 py-3.5">{h.city}, {h.state}</td>
                      <td className="px-5 py-3.5 font-medium">{h.roomTypes.length} configured</td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-stone-900">{availableCapacity}</span> / {totalCapacity} units
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Bookings Audit Trail */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Platform Transaction Audit Trail
            </h3>
            <span className="text-xs text-stone-400">Chronological activity</span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {bookings.map((b) => (
              <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center font-bold text-stone-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-stone-900">
                      {b.bookingReference} · {b.guest.firstName} {b.guest.lastName}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {b.hotelName} ({b.hotelCity}) · {b.roomTypeName} ({b.mealPlanName})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-stone-900">{formatCurrency(b.pricing.grandTotal)}</div>
                    <div className="text-[10px] text-stone-400 font-mono">{b.payment.transactionReference}</div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      b.bookingStatus === 'confirmed'
                        ? 'bg-amber-100 text-amber-900'
                        : b.bookingStatus === 'checked_in'
                        ? 'bg-blue-100 text-blue-900'
                        : b.bookingStatus === 'checked_out'
                        ? 'bg-stone-200 text-stone-700'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {b.bookingStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

