import { publicPaths } from "constant/paths";

import { LoginPage, SignupCompletePage, SignupRequestPage } from "@pages";

export const publicRoutes = [
  {
    path: publicPaths.login,
    element: <LoginPage />,
  },
  {
    path: publicPaths.requestRegister,
    element: <SignupRequestPage />,
  },
  {
    path: publicPaths.completeRegister,
    element: <SignupCompletePage />,
  },
];
