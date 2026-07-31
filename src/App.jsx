import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { getMe } from "./services/auth.service";
import { setUser } from "./redux/features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        dispatch(setUser(response.user));
      } catch (error) {
        console.log("User is not logged in");
      }
    };

    fetchUser();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;