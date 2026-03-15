"use client";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ZodError } from "zod";
import { fetchUserLogin } from "@/services/auth.Services";
import { useUser } from "@/hooks/useUser";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { loginSchema } from "@/utils/validation/authSchema";
import { loginPageInterface } from "@/utils/interfaces/authInterface";
import PasswordField from "@/components/PasswordField ";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<loginPageInterface>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        const validData = loginSchema.parse(data);
        const res = await fetchUserLogin(validData.email, validData.password);
        if (res.success) {
          toast.success(res.message);
          setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
          });
          setData({
            email: "",
            password: "",
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          toast.error(res.message);
        }
      } catch (error: any) {
        if (error instanceof ZodError) {
          toast.error(error.issues[0]?.message);
          return;
        }
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [data],
  );
  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-8 md:p-12">
        <div className="flex w-full max-w-xl flex-col gap-9 md:px-20">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Sign In to WalletWise
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <InputField
              name="email"
              type="email"
              text="Email"
              onChange={handleChange}
              value={data.email}
              disabled={loading}
              required
            />
            <div className="flex flex-col items-center justify-between">
              <PasswordField
                name="password"
                type="password"
                text="Password"
                onChange={handleChange}
                value={data.password}
                disabled={loading}
                required
              />
              <span className="mt-1 self-end text-xs">
                <Link href="/resetpassword">Forgot password?</Link>
              </span>
            </div>

            <div className="flex w-full flex-col gap-2">
              <Button
                text="Sign in"
                isLoading={loading}
                disabled={loading}
                type="submit"
              />
              <span className="mt-1 text-center">
                Didn't have an account?{" "}
                <span className="font-bold">
                  <Link href="/register">Sign up</Link>
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="font-slab relative hidden min-h-screen w-full overflow-hidden bg-[#0a0a0a] md:flex md:items-center md:justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>

        <div className="animate-spin-slow absolute top-10 right-10 h-20 w-20 rotate-45 border border-blue-500/30"></div>
        <div className="animate-float absolute right-32 bottom-32 h-16 w-16 rotate-12 border-2 border-cyan-500/20"></div>
        <div className="animate-float animation-delay-2000 absolute top-1/3 right-20 h-24 w-24 -rotate-12 border border-purple-500/30"></div>

        <div className="animate-blob absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-3xl"></div>
        <div className="animate-blob animation-delay-2000 absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-600/25 to-purple-600/25 blur-3xl"></div>
        <div className="animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 blur-3xl"></div>

        <div className="absolute top-20 left-1/4 h-2 w-2 animate-pulse rounded-full bg-blue-400/60"></div>
        <div className="animation-delay-1000 absolute top-40 right-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400/60"></div>
        <div className="animation-delay-2000 absolute bottom-40 left-1/3 h-2 w-2 animate-pulse rounded-full bg-purple-400/60"></div>
        <div className="animation-delay-3000 absolute top-60 right-1/4 h-1 w-1 animate-pulse rounded-full bg-blue-300/60"></div>
        <div className="animation-delay-1500 absolute right-2/3 bottom-60 h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400/60"></div>

        <div className="animate-line-move absolute top-1/4 left-0 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="animate-line-move animation-delay-2000 absolute top-2/3 right-0 h-px w-40 bg-gradient-to-l from-transparent via-purple-500/50 to-transparent"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-2xl"></div>

          <div className="relative rounded-3xl border border-slate-800/50 bg-slate-900/40 p-12 shadow-2xl backdrop-blur-xl">
            <div className="animate-fade-in mb-8 inline-block">
              <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-blue-300">
                    Smart Finance
                  </span>
                </div>
              </div>
            </div>

            <h2 className="animate-fade-in animation-delay-300 mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-7xl font-bold text-transparent">
              WalletWise
            </h2>

            <p className="animate-fade-in animation-delay-500 mb-8 text-2xl text-slate-300">
              Track. Analyze. Grow.
            </p>

            <div className="animate-fade-in animation-delay-700 space-y-4">
              <div className="group flex items-center gap-3">
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2 transition-colors duration-300 group-hover:bg-blue-500/20">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  Real-time collaboration
                </span>
              </div>

              <div className="group flex items-center gap-3">
                <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-2 transition-colors duration-300 group-hover:bg-purple-500/20">
                  <svg
                    className="h-5 w-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  Enterprise-grade security
                </span>
              </div>

              <div className="group flex items-center gap-3">
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-2 transition-colors duration-300 group-hover:bg-cyan-500/20">
                  <svg
                    className="h-5 w-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  Advanced analytics
                </span>
              </div>
            </div>

            <div className="animate-fade-in animation-delay-1000 mt-10 grid grid-cols-3 gap-6 border-t border-slate-700/50 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="mt-1 text-sm text-slate-500">Transactions</p>
              </div>
              <div className="border-x border-slate-700/50 text-center">
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="mt-1 text-sm text-slate-500">Encrypted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">Real-time</p>
                <p className="mt-1 text-sm text-slate-500">Updates</p>
              </div>
              <div className="border-x border-slate-700/50 text-center">
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="mt-1 text-sm text-slate-500">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="mt-1 text-sm text-slate-500">Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
    </main>
  );
};

export default LoginPage;
