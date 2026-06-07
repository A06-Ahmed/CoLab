import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#EEF2FF] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.96),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,91,219,0.14),transparent_28%),linear-gradient(180deg,#F8FAFF_0%,#EEF2FF_100%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] xl:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-screen overflow-hidden md:flex md:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_46%,#EBF2FF_100%)]" />

          <div className="absolute left-[-8rem] top-36 h-72 w-72 rounded-[2rem] border border-white/60 bg-white/25 backdrop-blur-2xl shadow-[0_32px_90px_rgba(59,91,219,0.08)] rotate-12" />
          <div className="absolute left-[-3rem] bottom-16 h-56 w-56 rounded-[2rem] border border-white/50 bg-white/20 backdrop-blur-2xl shadow-[0_24px_60px_rgba(59,91,219,0.08)] -rotate-12" />
          <div className="absolute left-[14%] top-[42%] h-24 w-24 rounded-[1.5rem] border border-white/60 bg-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(59,91,219,0.08)] rotate-45" />
          <div className="absolute bottom-[-12%] left-[-4%] h-[52%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22)_0%,rgba(59,130,246,0.12)_34%,transparent_74%)] blur-3xl" />
          <div className="absolute right-[-12%] top-[32%] h-[40%] w-[36%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18)_0%,rgba(99,102,241,0.08)_36%,transparent_74%)] blur-3xl" />

          <div className="absolute left-8 top-6 z-10">
            <Link to="/welcome" className="inline-flex items-center gap-2 transition hover:opacity-90">
              <img src="/colab-logo-gradient.svg" alt="CoLab" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center px-10">
            <div className="max-w-xl text-center">
              <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[#3B5BDB]/15 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#3B5BDB] shadow-[0_10px_30px_rgba(59,91,219,0.08)]">
                CoLab
              </div>
              <img src="/colab-logo-gradient.svg" alt="CoLab" className="mx-auto h-24 w-auto md:h-28 lg:h-32" />
              <p className="mt-8 text-2xl leading-tight text-slate-600 md:text-3xl">
                Collaborer aujourd&apos;hui,
                <br />
                innover demain.
              </p>
            </div>
          </div>
        </section>

        <main className="relative flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-[560px]">
            <div className="mb-5 flex items-center gap-2 md:hidden">
              <img src="/colab-logo-gradient.svg" alt="CoLab" className="h-9 w-auto" />
              <span className="text-base font-semibold tracking-tight text-[#1E3A8A]">
                CoLab
              </span>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
                  {title}
                </h1>
                <p className="mt-3 text-sm text-slate-500">{subtitle}</p>
              </div>

              {children}

              {footer && (
                <div className="mt-8 text-center text-sm text-slate-500">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-400">
        © 2024 CoLab. Tous droits réservés.
      </p>
    </div>
  );
}
