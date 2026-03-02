'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@components/ui/Button';
import { authService } from '@services/auth.service';
import { ROUTES } from '@constants/routes';

const RESEND_COOLDOWN = 60; // seconds
const REDIRECT_DELAY = 3;  // seconds before redirecting to login after success

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);

  // Resend cooldown state — starts at 60 immediately (email was just sent on register)
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const redirectIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start (or restart) the 60-second resend cooldown
  const startCountdown = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCountdown(RESEND_COOLDOWN);

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start redirect countdown after email is verified
  const startRedirectCountdown = () => {
    // Stop the resend cooldown — no longer needed
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setRedirectCountdown(REDIRECT_DELAY);
    redirectIntervalRef.current = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(redirectIntervalRef.current!);
          redirectIntervalRef.current = null;
          router.push(ROUTES.LOGIN);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start resend countdown on first mount (email sent right after register)
  useEffect(() => {
    startCountdown();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (redirectIntervalRef.current) clearInterval(redirectIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        // Redirect ke login setelah beberapa detik
        startRedirectCountdown();
      } catch (err: unknown) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr?.response?.data?.message ?? 'Verifikasi email gagal.');
      } finally {
        setIsLoading(false);
      }
    };

    void verifyFromSignedUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Restart resend cooldown
      startCountdown();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message ?? 'Gagal mengirim ulang email verifikasi.',
      );
    } finally {
      setIsResending(false);
    }
  };

  const canResend = countdown === 0 && !isResending && !isLoading && redirectCountdown === null;

  // Once verified and redirect is scheduled, show a clean success view
  if (redirectCountdown !== null) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-primary/10 p-4 text-sm text-foreground">
          {successMessage}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Mengalihkan ke halaman login dalam{' '}
          <span className="font-semibold text-primary">{redirectCountdown} detik</span>...
        </p>
        <Link href={ROUTES.LOGIN} className="w-full">
          <Button type="button" className="w-full">
            Masuk Sekarang
          </Button>
        </Link>
      </div>
    );
  }

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
        disabled={!canResend}
      >
        {countdown > 0
          ? `Kirim ulang dalam ${countdown} detik`
          : 'Kirim Ulang Email Verifikasi'}
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
