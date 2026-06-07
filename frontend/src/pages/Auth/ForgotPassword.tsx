import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordSchema,
  type forgotPasswordSchemaType,
} from "@/zod/authSchemas";
import { sendPasswordResetCode } from "@/api/functions/auth";
import { handleApiErrors } from "@/api/functions/validation";
import AuthShell from "./AuthShell";
import { TextField } from "./AuthFields";

export default function ForgotPassword() {
  const nav = useNavigate();
  const form = useForm<forgotPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: sendPasswordResetCodeMutation,
    isPending: isSendPasswordResetCodePending,
  } = useMutation({
    mutationFn: (data: forgotPasswordSchemaType) => sendPasswordResetCode(data),
    onMutate: (data) => {
      localStorage.setItem("user-email", String(data?.email));
    },
    onError: (err) => {
      handleApiErrors(err, form);
    },
    onSuccess: () => {
      nav("/verify-reset-code");
    },
  });

  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Entrez votre adresse e-mail pour recevoir un lien de réinitialisation."
      footer={
        <Link to="/sign-in" className="font-medium text-[#3B5BDB] hover:underline">
          ← Retour à la connexion
        </Link>
      }
    >
      <form
        onSubmit={form.handleSubmit((data) =>
          sendPasswordResetCodeMutation(data),
        )}
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

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
          disabled={isSendPasswordResetCodePending}
        >
          {isSendPasswordResetCodePending ? "Envoi..." : "Envoyer le lien"}
        </Button>
      </form>
    </AuthShell>
  );
}
