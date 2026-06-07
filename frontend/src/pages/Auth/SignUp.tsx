import { Link } from "react-router-dom";
import { Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/api/functions/auth";
import { signUpSchema, type signUpSchemaType } from "@/zod/authSchemas";
import { useAppDispatch } from "@/redux/store";
import { handleApiErrors } from "@/api/functions/validation";
import AuthShell from "./AuthShell";
import {
  AuthDivider,
  CheckboxField,
  PasswordField,
  TextField,
} from "./AuthFields";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const disp = useAppDispatch();
  const form = useForm<signUpSchemaType>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      terms: false,
    },
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signUpMutation, isPending: isSignUpPending } = useMutation({
    mutationFn: (data: signUpSchemaType) => signUp(data, disp),
    onError: (err) => {
      handleApiErrors(err, form);
    },
  });

  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Rejoignez CoLab et commencez à collaborer."
      footer={
        <>
          Vous avez déjà un compte ?{" "}
          <Link to="/sign-in" className="font-medium text-[#3B5BDB] hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <form
        onSubmit={form.handleSubmit((data) => signUpMutation(data))}
        className="space-y-5"
      >
        <TextField
          control={form.control}
          name="full_name"
          label="Nom complet"
          placeholder="Votre nom complet"
          icon={<User className="h-4 w-4" />}
          autoComplete="name"
        />

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
          placeholder="Créez un mot de passe"
          icon={<Lock className="h-4 w-4" />}
          autoComplete="new-password"
          helperText="Au moins 6 caractères."
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

        <CheckboxField control={form.control} name="terms">
          J&apos;accepte les{" "}
          <a href="#" className="font-medium text-[#3B5BDB] hover:underline">
            Conditions d&apos;utilisation
          </a>{" "}
          et la{" "}
          <a href="#" className="font-medium text-[#3B5BDB] hover:underline">
            Politique de confidentialité
          </a>
        </CheckboxField>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
          disabled={isSignUpPending}
        >
          {isSignUpPending ? "Création..." : "Créer mon compte"}
        </Button>

        <AuthDivider />
      </form>
    </AuthShell>
  );
}
