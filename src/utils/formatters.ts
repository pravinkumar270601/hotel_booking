import { format, parseISO } from 'date-fns';
import { HotelCategory, IncludedMeal, MealPlanCode } from '../types/hotel';

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDisplayDate(dateStr: string, pattern = 'dd MMM yyyy'): string {
  try {
    if (!dateStr) return '';
    return format(parseISO(dateStr), pattern);
  } catch {
    return dateStr;
  }
}

export function getCategoryLabel(category: HotelCategory): string {
  switch (category) {
    case 'budget':
      return 'Budget & Standard';
    case 'premium':
      return 'Premium Hotel';
    case 'luxury':
      return 'Luxury Stays';
    case 'resort':
      return 'Resort & Retreat';
    case 'business':
      return 'Business Hotel';
    case 'boutique':
      return 'Heritage & Boutique';
    default:
      return category;
  }
}

export function getCategoryBadgeClass(category: HotelCategory): string {
  switch (category) {
    case 'luxury':
      return 'bg-amber-100 text-amber-900 border-amber-300';
    case 'resort':
      return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    case 'premium':
      return 'bg-indigo-100 text-indigo-900 border-indigo-300';
    case 'business':
      return 'bg-blue-100 text-blue-900 border-blue-300';
    case 'budget':
      return 'bg-stone-200 text-stone-800 border-stone-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getMealPlanBadgeInfo(code: MealPlanCode): { name: string; tag: string } {
  switch (code) {
    case 'RO':
      return { name: 'Room Only (RO / EP)', tag: 'No Meals Included' };
    case 'BB':
      return { name: 'Bed & Breakfast (BB / CP)', tag: 'Breakfast Included' };
    case 'HB':
      return { name: 'Half Board (HB / MAP)', tag: 'Breakfast + Dinner' };
    case 'FB':
      return { name: 'Full Board (FB / AP)', tag: 'All 3 Meals Included' };
    case 'AI':
      return { name: 'All-Inclusive (AI)', tag: 'Meals & Beverages' };
  }
}

export function getMealSummary(meals: IncludedMeal[]): string {
  if (meals.length === 0) return 'Room Only (Meals charged separately)';
  const capitalized = meals.map(m => m.charAt(0).toUpperCase() + m.slice(1));
  return capitalized.join(' + ');
}

