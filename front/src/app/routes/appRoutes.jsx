import { HomePage } from "../../home/ui/HomePage";
import { MealPage } from "../../meal/ui/MealPage";
import { MealPlanPage } from "../../meal_plan/ui/MealPlanPage";
import { SettingPage } from "../../setting/ui/SettingPage";
import { Layout } from "../../shared/layout/Layout";
import { DataSetter } from "../../shared/lib/DataSetter";
import RedirectHandler from "../../shared/lib/RedirectHandler";
import { UserPage } from "../../user/ui/UserPage";
import { VoucherPage } from "../../voucher/ui/VoucherPage";

export const appRoutes = [
  {
    path: "/",
    element: <DataSetter />,
    children: [
      {
        element: <RedirectHandler />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },

              {
                path: "meals",
                element: <MealPage />,
              },
              {
                path: "meal-plans",
                element: <MealPlanPage />,
              },
              {
                path: "setting",
                element: <SettingPage />,
              },
              {
                path: "voucher",
                element: <VoucherPage />,
              },
              {
                path: "users",
                element: <UserPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];
