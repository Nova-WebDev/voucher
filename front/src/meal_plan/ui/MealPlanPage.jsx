import { useState } from "react";
import { MealPlanHeader } from "../components/MealPlanHeader";
import { MealPlanBody } from "../components/MealPlanBody";

export const MealPlanPage = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div>
      <MealPlanHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <MealPlanBody selectedDate={selectedDate} />
    </div>
  );
};
