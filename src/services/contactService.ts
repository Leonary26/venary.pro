import type { TranslationDictionary } from '../i18n/types';
import type { ContactFormValues, ContactPayload } from '../types/venary';

export interface ContactValidationErrors {
  fullName?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  messageId: string;
  submittedAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(
  values: ContactFormValues,
  messages: TranslationDictionary['contact']['form']['validation'],
): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = messages.fullName;
  }

  if (!values.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  if (!values.projectType.trim()) {
    errors.projectType = messages.projectTypeRequired;
  }

  if (!values.message.trim() || values.message.trim().length < 15) {
    errors.message = messages.messageMinLength;
  }

  return errors;
}

/**
 * Envoie réellement les données du formulaire vers la route API sécurisée `/api/contact`
 * qui transmet le message via Resend côté serveur. Aucune simulation côté client.
 */
export async function submitContactRequest(
  payload: ContactPayload,
  fallbackErrorMessage: string,
): Promise<ContactSubmissionResult> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data: {
    success?: boolean;
    messageId?: string;
    submittedAt?: string;
    error?: string;
  } | null = null;

  try {
    data = (await response.json()) as {
      success?: boolean;
      messageId?: string;
      submittedAt?: string;
      error?: string;
    };
  } catch {
    data = null;
  }

  if (!response.ok || !data?.success || !data?.messageId) {
    throw new Error(data?.error || fallbackErrorMessage);
  }

  return {
    success: true,
    messageId: data.messageId,
    submittedAt: data.submittedAt || new Date().toISOString(),
  };
}
