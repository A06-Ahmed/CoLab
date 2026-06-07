import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/api/functions/auth";
import { signInSchema, type signInSchemaType } from "@/zod/authSchemas";
import { useAppDispatch } from "@/redux/store";
import { handleApiErrors } from "@/api/functions/validation";
import AuthShell from "./AuthShell";
import { AuthDivider, PasswordField, TextField } from "./AuthFields";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const disp = useAppDispatch();
  const form = useForm<signInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signInMutation, isPending: isSignInPending } = useMutation({
    mutationFn: (data: signInSchemaType) => signIn(data, disp),
    onError: (err) => {
      handleApiErrors(err, form);
    },
  });

  return (
    <AuthShell
      title="Connexion"
      subtitle="Bienvenue ! Connectez-vous à votre espace CoLab."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link to="/sign-up" className="font-medium text-[#3B5BDB] hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <form
        onSubmit={form.handleSubmit((data) => signInMutation(data))}
        className="space-y-5"
      >
        <TextField
          control={form.control}
          name="email"
          label="Adresse e-mail"
          placeholder="votre@email.com"
          icon={<Mail className="h-4 w-4" />}
          autoComplete="email"
        />

        <PasswordField
          control={form.control}
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="current-password"
          visible={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
        />

        <div className="flex items-center justify-between gap-4 pt-1">
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-[#3B5BDB]"
            />
            <span>Se souvenir de moi</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-[#3B5BDB] hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
          disabled={isSignInPending}
        >
          {isSignInPending ? "Connexion..." : "Se connecter"}
        </Button>

        <AuthDivider />
      </form>
    </AuthShell>
  );
}
