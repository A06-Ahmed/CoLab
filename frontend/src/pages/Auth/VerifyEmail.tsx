import AuthShell from "./AuthShell";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resendEmailVerificationCode,
  signOut,
  verifyEmailCode,
} from "@/api/functions/auth";
import {
  verificationCodeSchema,
  type verificationCodeSchemaType,
} from "@/zod/authSchemas";
import { useAppDispatch } from "@/redux/store";
import { handleApiErrors } from "@/api/functions/validation";
import { InfoBox, OtpField } from "./AuthFields";

export default function VerifyEmail() {
  const disp = useAppDispatch();
  const form = useForm<verificationCodeSchemaType>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(verificationCodeSchema),
  });

  const { mutate: signOutMutation, isPending: isSignOutPending } = useMutation({
    mutationFn: () => signOut(disp),
  });

  const {
    mutate: verifyEmailCodeMutation,
    isPending: isVerifyEmailCodePending,
  } = useMutation({
    mutationFn: (data: verificationCodeSchemaType) =>
      verifyEmailCode(data, disp),
    onError: (err) => {
      handleApiErrors(err, form);
    },
  });

  const {
    mutate: resendEmailVerificationCodeMutation,
    isPending: isResendEmailVerificationCodePending,
  } = useMutation({
    mutationFn: () => resendEmailVerificationCode(disp),
  });

  return (
    <AuthShell
      title="Vérifiez votre e-mail"
      subtitle="Un e-mail de confirmation a été envoyé à votre adresse."
      footer={
        <button
          type="button"
          onClick={() => signOutMutation()}
          className="font-medium text-[#3B5BDB] hover:underline disabled:opacity-50"
          disabled={isSignOutPending}
        >
          Retour à la connexion
        </button>
      }
    >
      <div className="space-y-5">
        <InfoBox>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#3B5BDB] shadow-sm">
              <Mail className="h-4 w-4" />
            </div>
            <p>
              Saisissez le code à 6 chiffres reçu par e-mail pour continuer.
            </p>
          </div>
        </InfoBox>

        <form
          onSubmit={form.handleSubmit((data) => verifyEmailCodeMutation(data))}
          className="space-y-5"
        >
          <OtpField control={form.control} name="code" label="Code de vérification" />

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
            disabled={isVerifyEmailCodePending}
          >
            {isVerifyEmailCodePending ? "Vérification..." : "Vérifier le code"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl border-[#3B5BDB] text-sm font-semibold text-[#3B5BDB] hover:bg-[#EEF2FF]"
            disabled={isResendEmailVerificationCodePending}
            onClick={() => resendEmailVerificationCodeMutation()}
          >
            {isResendEmailVerificationCodePending
              ? "Renvoi..."
              : "Renvoyer l'e-mail"}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
