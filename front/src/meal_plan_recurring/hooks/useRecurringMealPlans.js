import { useEffect } from "react";
import { useRecurringMealPlanStore } from "../store/recurringMealPlanStore";
import { getAllRecurringMealPlans } from "../api/mealPlanRecurringApi";

export function useRecurringMealPlans() {
  const items = useRecurringMealPlanStore((s) => s.items);
  const isLoaded = useRecurringMealPlanStore((s) => s.isLoaded);
  const setItems = useRecurringMealPlanStore((s) => s.setItems);

  
  useEffect(() => {
    if (isLoaded) return; 

    getAllRecurringMealPlans().then((data) => {
      setItems(data); 
    });
  }, [isLoaded, setItems]);


  return {
    data: items,       
    loading: !isLoaded, 
  };
}
