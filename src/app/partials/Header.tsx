import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "../../shared/components";
import { useSignOutMutation, useGetUserQuery } from "../../shared/hooks";

export const Header = () => {
  const navigate = useNavigate();

  const { data: user } = useGetUserQuery();
  const [signOut, { isLoading }] = useSignOutMutation();

  return (
    <header className="flex justify-between item-center h-12 p-4 bg-slate-300">
      <div className="flex items-center">
        <NavLink to="/">Sample App</NavLink>
      </div>
      <div className="flex items-center gap-4">
        <div>{user?.name}</div>
        {user ? (
          <Button
            color="link"
            onClick={() =>
              signOut().finally(() => {
                navigate("/", { replace: true });
              })
            }
            disabled={isLoading}
          >
            Sign Out
          </Button>
        ) : (
          <Button color="primary" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};
