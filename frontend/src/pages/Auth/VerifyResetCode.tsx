import AuthShell from "./AuthShell";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetCode, verifyResetCode } from "@/api/functions/auth";
import {
  verificationCodeSchema,
  type verificationCodeSchemaType,
} from "@/zod/authSchemas";
import { handleApiErrors } from "@/api/functions/validation";
import { OtpField } from "./AuthFields";

export default function VerifyResetCode() {
  const nav = useNavigate();
  const userEmail = localStorage.getItem("user-email");
  const form = useForm<verificationCodeSchemaType>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(verificationCodeSchema),
  });

  const {
    mutate: verifyResetCodeMutation,
    isPending: isVerifyResetCodePending,
  } = useMutation({
    mutationFn: (data: verificationCodeSchemaType) =>
      verifyResetCode({ ...data, email: userEmail }),
    onMutate: (data) => {
      localStorage.setItem("user-code", String(data?.code));
    },
    onError: (err) => {
      handleApiErrors(err, form);
    },
    onSuccess: () => {
      nav("/reset-password");
    },
  });

  const {
    mutate: sendPasswordResetCodeMutation,
    isPending: isSendPasswordResetCodePending,
  } = useMutation({
    mutationFn: () => sendPasswordResetCode({ email: userEmail }),
  });

  if (!userEmail) return <Navigate to={"/"} replace />;

  return (
    <AuthShell
      title="Vérification du code"
      subtitle="Entrez le code reçu par e-mail."
      footer={
        <button
          type="button"
          onClick={() => sendPasswordResetCodeMutation()}
          className="font-medium text-[#3B5BDB] hover:underline disabled:opacity-50"
          disabled={isSendPasswordResetCodePending}
        >
          Renvoyer le code
        </button>
      }
    >
      <form
        onSubmit={form.handleSubmit((data) => verifyResetCodeMutation(data))}
        className="space-y-5"
      >
        <OtpField control={form.control} name="code" label="Code de réinitialisation" />

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#3B5BDB] text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#2F4AC2]"
          disabled={isVerifyResetCodePending}
        >
          {isVerifyResetCodePending ? "Vérification..." : "Vérifier le code"}
        </Button>
      </form>
    </AuthShell>
  );
}
