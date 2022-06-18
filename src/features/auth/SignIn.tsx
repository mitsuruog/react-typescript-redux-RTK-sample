import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignInMutation } from "../../shared/hooks";
import { Button, Input, Label } from "../../shared/components";

type SignInForm = {
  username: string;
  password: string;
};

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [signIn, { isLoading }] = useSignInMutation();

  const [form, setForm] = useState<SignInForm>({ username: "", password: "" });

  const onFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const values = { ...form, [`${name}`]: value };
    setForm(values);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(false);
      await signIn(form).unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl">Sign In</h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        autoComplete="true"
      >
        <div className="flex flex-col gap-2">
          <Label>User Name</Label>
          <Input
            id="username"
            name="username"
            onChange={onFormChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={onFormChange}
            required
          />
        </div>
        <div className="flex flex-col items-start gap-4">
          {error && (
            <p className="text-red-700">
              The user name or password is incorrect.
            </p>
          )}
          <Button type="submit" color="primary" disabled={isLoading}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
