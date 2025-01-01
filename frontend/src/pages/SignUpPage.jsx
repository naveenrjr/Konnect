import React from "react";
import AuthForm from "../components/AuthForm";
import { MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 sm:grid-col-1 gap-10 ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MessageSquare className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Create Account</h1>
        <p className="text-base-content/60">
          Start Konnecting with your free account today!
        </p>
        <AuthForm />
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <AuthImagePattern
        title="Join for free"
        subtitle="Connect with everyone you love and more"
      />
    </div>
  );
}

export default SignUpPage;
