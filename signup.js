import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Agent Login</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="email/phone number"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <a href="#" className="text-blue-500 text-sm">Forgot password?</a>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
  
}


export default Login;
