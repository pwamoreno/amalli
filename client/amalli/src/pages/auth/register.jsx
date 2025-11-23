import CommonForm from "@/components/common/form";
import { AmalliLogo } from "@/components/icons/AmalliLogo";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(`${data?.payload?.message}`, {
          style: { background: "#22c55e", color: "white" },
        });
        navigate("/auth/login");
      } else {
        toast(`${data?.payload?.message}`, {
          style: { background: "#fa113d", color: "white" },
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="flex justify-center mb-24">
        <AmalliLogo size={90} color="#FFD700" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create a new account
        </h1>
      </div>

      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <div className="text-center">
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="text-center">
        <Link
          className="font-medium text-primary hover:underline"
          to="/shop/home"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthRegister;
