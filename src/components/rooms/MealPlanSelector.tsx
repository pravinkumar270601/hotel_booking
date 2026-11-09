import React from 'react';
import { Check, Coffee, Utensils, Sparkles, GlassWater } from 'lucide-react';
import { MealPlan, RoomType } from '../../types/hotel';
import { formatCurrency } from '../../utils/formatters';

interface MealPlanSelectorProps {
  roomType: RoomType;
  selectedMealPlanId: string;
  onSelectMealPlan: (plan: MealPlan) => void;
}

export const MealPlanSelector: React.FC<MealPlanSelectorProps> = ({
  roomType,
  selectedMealPlanId,
  onSelectMealPlan,
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-stone-200">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
          <Utensils className="w-3.5 h-3.5 text-amber-600" />
          Choose Your Meal Package (Per Night)
        </label>
        <span className="text-xs text-stone-500 italic">
          Configure independently per room
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {roomType.mealPlans.map((plan) => {
          const isSelected = plan.id === selectedMealPlanId;
          const totalPerNight = roomType.basePricePerNight + plan.pricePerNight;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectMealPlan(plan)}
              className={`relative cursor-pointer rounded-xl p-3.5 border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
              }`}
            >
              {/* Badge if Popular */}
              {plan.badge && (
                <span className="absolute -top-2.5 right-3 bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">
                        {plan.name}
                      </h4>
                      <p className="text-[11px] font-medium text-stone-500">
                        {plan.regionalName}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mt-2 pl-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Included Meal Chips */}
                <div className="mt-2.5 pl-6 flex flex-wrap gap-1">
                  {plan.includedMeals.length === 0 ? (
                    <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded">
                      No Meals Included
                    </span>
                  ) : (
                    plan.includedMeals.map((meal) => (
                      <span
                        key={meal}
                        className="text-[10px] font-semibold bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1 capitalize"
                      >
                        {meal === 'breakfast' && <Coffee className="w-2.5 h-2.5" />}
                        {meal === 'lunch' && <Utensils className="w-2.5 h-2.5" />}
                        {meal === 'dinner' && <Utensils className="w-2.5 h-2.5" />}
                        {meal === 'beverages' && <GlassWater className="w-2.5 h-2.5" />}
                        {meal}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Price Calculation for this plan */}
              <div className="mt-3.5 pt-2.5 border-t border-stone-200/60 pl-6 flex items-baseline justify-between">
                <span className="text-xs text-stone-500 font-medium">
                  {plan.pricePerNight === 0 ? (
                    'Included in base'
                  ) : (
                    `+${formatCurrency(plan.pricePerNight)}/nt add-on`
                  )}
                </span>
                <div className="text-right">
                  <span className="text-sm font-bold text-stone-900">
                    {formatCurrency(totalPerNight)}
                  </span>
                  <span className="text-[11px] text-stone-500"> / night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

