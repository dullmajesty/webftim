import LoginPage from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Main from "../Pages/Main";
import Users from "../Pages/Users";
import ConfirmationPage from "../Pages/Confirm";
import ForgotPasswordPage from "../Pages/ForgotPass";

const routes = [
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Main />
            },
            {
                path: "users/:id",
                element: <Users />
            },
            {
                path: "reports",
                element: <div>Reports</div>
            },
            {
                path: "settings",
                element: <div>Settings</div>
            }
        ]
    },
    {
        path: "confirm",
        element: <ConfirmationPage/>
    },
    {
        path: "forgot-password",
        element: <ForgotPasswordPage/>
    }
];

export default routes;
