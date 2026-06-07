import AuthShell from "./AuthShell";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Lock } from "lucide-react";
import {
  resetPasswordSchema,
  type resetPasswordSchemaType,
} from "@/zod/authSchemas";
import { resetUserPassword } from "@/api/functions/auth";
import { handleApiErrors } from "@/api/functions/validation";
import { useAppDispatch } from "@/redux/store";
import { AuthDivider, PasswordField } from "./AuthFields";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const nav = useNavigate();
  const disp = useAppDispatch();
  const userEmail = localStorage.getItem("user-email");
  const userCode = localStorage.getItem("user-code");
  const form = useForm<resetPasswordSchemaType>({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    mutate: resetUserPasswordMutation,
    isPending: isResetUserPasswordPending,
  } = useMutation({
    mutationFn: (data: resetPasswordSchemaType) =>
      resetUserPassword({ ...data, email: userEmail, code: userCode }, disp),
    onError: (err) => {
      handleApiErrors(err, form);
    },
    onSuccess: () => {
      nav("/reset-password");
      localStorage.removeItem("user-email");
      localStorage.removeItem("user-code");
    },
  });

  if (!userEmail || !userCode) return <Navigate to={"/"} replace />;

  return (
    <AuthShell
      title="Réinitialiser le mot de passe"
      subtitle="Créez un nouveau mot de passe sécurisé."
      footer={
        <Link to="/sign-in" className="font-medium text-[#3B5BDB] hover:underline">
          Retour à la connexion
        </Link>
      }
    >
      <form
        onSubmit={form.handleSubmit((data) => resetUserPasswordMutation(data))}
        className="space-y-5"
      >
        <PasswordField
          control={form.control}
          name="password"
          label="Nouveau mot de passe"
          placeholder="Créez un nouveau mot de passe"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="new-password"
          visible={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
        />

        <PasswordField
          control={form.control}
          name="password_confirmation"
          label="Confirmer le mot de passe"
          placeholder="Confirmez votre mot de passe"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="new-password"
          visible={showConfirmation}
          onToggle={() => setShowConfirmation((value) => !value)}
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
          disabled={isResetUserPasswordPending}
        >
          {isResetUserPasswordPending
            ? "Réinitialisation..."
            : "Réinitialiser le mot de passe"}
        </Button>

        <AuthDivider />
      </form>
    </AuthShell>
  );
}
