import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  icon: ReactNode;
  autoComplete?: string;
  rightElement?: ReactNode;
  helperText?: ReactNode;
};

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon,
  autoComplete,
  rightElement,
  helperText,
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-[#0F172A]"
          >
            {label}
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              {icon}
            </span>
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              className={cn(
                "h-12 w-full rounded-xl border border-slate-200 bg-[#F8FAFF] pl-12 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200 outline-none focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/30",
                rightElement && "pr-12",
              )}
            />

            {rightElement && (
              <span className="absolute inset-y-0 right-3 flex items-center">
                {rightElement}
              </span>
            )}
          </div>

          {helperText && (
            <p className="text-xs leading-relaxed text-slate-400">{helperText}</p>
          )}

          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

type PasswordFieldProps<T extends FieldValues> = Omit<
  TextFieldProps<T>,
  "type" | "rightElement"
> & {
  visible: boolean;
  onToggle: () => void;
};

export function PasswordField<T extends FieldValues>({
  visible,
  onToggle,
  ...props
}: PasswordFieldProps<T>) {
  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      rightElement={
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

type OtpFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
};

export function OtpField<T extends FieldValues>({
  control,
  name,
  label = "Code",
  placeholder = "••••••",
}: OtpFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-3">
          <label htmlFor={name} className="sr-only">
            {label}
          </label>
          <input
            {...field}
            id={name}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
            className="mx-auto block w-full max-w-sm rounded-xl border border-slate-200 bg-[#F8FAFF] px-4 py-3 text-center font-mono text-xl tracking-[0.45em] text-[#0F172A] placeholder:text-slate-300 outline-none transition-all duration-200 focus:border-[#3B5BDB] focus:ring-2 focus:ring-[#3B5BDB]/30"
          />
          {fieldState.error && (
            <p className="text-center text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

type CheckboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  children: ReactNode;
};

export function CheckboxField<T extends FieldValues>({
  control,
  name,
  children,
}: CheckboxFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={Boolean(field.value)}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="mt-0.5 h-4 w-4 rounded accent-[#3B5BDB]"
            />
            <span className="leading-relaxed">{children}</span>
          </label>
          {fieldState.error && (
            <p className="text-xs text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#BFDBFE] bg-[#EEF2FF] px-4 py-3 text-sm leading-relaxed text-slate-600">
      {children}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-400">ou</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
