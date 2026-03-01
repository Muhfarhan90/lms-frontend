'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@components/ui/Button';
import { authService } from '@services/auth.service';
import { ROUTES } from '@constants/routes';

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const verificationParams = useMemo(() => {
    const id = searchParams.get('id');
    const hash = searchParams.get('hash');
    const expires = searchParams.get('expires') ?? undefined;
    const signature = searchParams.get('signature') ?? undefined;

    if (!id || !hash) {
      return null;
    }

    return { id, hash, expires, signature };
  }, [searchParams]);

  useEffect(() => {
    const verifyFromSignedUrl = async () => {
      if (!verificationParams) return;

      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await authService.verifyEmail(
          verificationParams.id,
          verificationParams.hash,
          {
            expires: verificationParams.expires,
            signature: verificationParams.signature,
          },
        );

        setSuccessMessage(response.data.message ?? 'Email berhasil diverifikasi.');
      } catch (err: unknown) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr?.response?.data?.message ?? 'Verifikasi email gagal.');
      } finally {
        setIsLoading(false);
      }
    };

    void verifyFromSignedUrl();
  }, [verificationParams]);

  const handleResend = async () => {
    setIsResending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await authService.resendVerificationEmail();
      setSuccessMessage(
        response.data.message ?? 'Email verifikasi telah dikirim ulang.',
      );
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message ?? 'Gagal mengirim ulang email verifikasi.',
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Cek inbox email Anda dan klik tautan verifikasi untuk mengaktifkan akun.
      </p>

      {error && (
        <div className="rounded-lg bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="rounded-lg bg-primary/10 p-3 text-sm text-foreground">
          {successMessage}
        </div>
      )}

      <Button
        type="button"
        onClick={handleResend}
        isLoading={isResending}
        disabled={isLoading}
      >
        Kirim Ulang Email Verifikasi
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah diverifikasi?{' '}
        <Link href={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
          Masuk sekarang
        </Link>
      </p>
    </div>
  );
}
