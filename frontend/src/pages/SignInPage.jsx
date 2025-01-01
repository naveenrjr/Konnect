import React from "react";
import AuthForm from "../components/AuthForm";
import { MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";

function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 sm:grid-col-1 gap-10 ">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MessageSquare className="size-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Already have an account?</h1>
        <p className="text-base-content/60">
          Login and start chatting with your friends!
        </p>
        <AuthForm type="signin" />
        <div className="text-center">
          <p className="text-base-content/60">
            Want to create an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
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

export default SignInPage;
