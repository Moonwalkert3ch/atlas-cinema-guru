"use client";

import { signIn, getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn("github", { callbackUrl: "/" }); // Redirect to home page
    console.log("Sign-in result:", result);
  };

  useEffect(() => {
    // Check if user is already authenticated and redirect
    const checkAuth = async () => {
      const session = await getSession();
      if (session) router.push("/home"); // Redirect if already authenticated
    };
    checkAuth();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      <h1 className="mt-6 text-3xl font-bold text-gray-800">Welcome</h1>
      <p className="mt-2 text-gray-600">
        Sign in with your GitHub account to access the app
      </p>
      <button
        onClick={handleSignIn}
        className="mt-8 px-6 py-3 bg-teal-500 text-white font-medium rounded-lg shadow hover:bg-teal-600 focus:outline-none"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
