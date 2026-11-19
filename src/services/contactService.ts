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
  deliveryStatus?: string;
}

export class ContactRequestError extends Error {
  code?: string;

  constructor(message: unknown, code?: string) {
    super(extractSafeErrorMessage(message, 'Une erreur est survenue.'));
    this.name = 'ContactRequestError';
    this.code = code;
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function findSafeErrorString(value: unknown, depth = 0): string | null {
  if (depth > 5 || value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.length > 0 && !trimmed.includes('[object Object]')) {
      return trimmed;
    }
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findSafeErrorString(item, depth + 1);
      if (found) {
        return found;
      }
    }
    return null;
  }

  if (value instanceof Error) {
    return findSafeErrorString(value.message, depth + 1);
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    for (const key of ['error', 'message', 'detail', 'msg', 'reason', 'title']) {
      if (Object.prototype.hasOwnProperty.call(record, key)) {
        const found = findSafeErrorString(record[key], depth + 1);
        if (found) {
          return found;
        }
      }
    }
  }

  return null;
}

export function extractSafeErrorMessage(
  value: unknown,
  fallback: string,
  depth = 0,
): string {
  const safeFallback = findSafeErrorString(fallback) ?? 'Une erreur est survenue.';
  return findSafeErrorString(value, depth) ?? safeFallback;
}

export function validateContactForm(
  values: ContactFormValues,
  messages: TranslationDictionary['contact']['form']['validation'],
): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  if (!values.fullName.trim() || values.fullName.trim().length < 2) {
    errors.fullName = extractSafeErrorMessage(
      messages.fullName,
      'Veuillez renseigner votre nom complet.',
    );
  }

  if (!values.email.trim()) {
    errors.email = extractSafeErrorMessage(
      messages.emailRequired,
      'Veuillez saisir votre adresse e-mail.',
    );
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = extractSafeErrorMessage(
      messages.emailInvalid,
      'Veuillez saisir une adresse e-mail valide.',
    );
  }

  if (!values.projectType.trim()) {
    errors.projectType = extractSafeErrorMessage(
      messages.projectTypeRequired,
      'Veuillez sélectionner un type de projet.',
    );
  }

  if (!values.message.trim() || values.message.trim().length < 15) {
    errors.message = extractSafeErrorMessage(
      messages.messageMinLength,
      'Veuillez saisir un message de 15 caractères minimum.',
    );
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
  let response: Response;

  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ContactRequestError(fallbackErrorMessage, 'NETWORK_ERROR');
  }

  let rawBody: unknown = null;

  try {
    const textBody = await response.text();
    rawBody = textBody ? (JSON.parse(textBody) as unknown) : null;
  } catch {
    rawBody = null;
  }

  const data =
    typeof rawBody === 'object' && rawBody !== null
      ? (rawBody as {
          success?: unknown;
          messageId?: unknown;
          submittedAt?: unknown;
          deliveryStatus?: unknown;
          error?: unknown;
          code?: unknown;
        })
      : null;

  if (
    !response.ok ||
    data?.success !== true ||
    typeof data.messageId !== 'string' ||
    data.messageId.trim().length === 0
  ) {
    const safeError = extractSafeErrorMessage(
      data?.error ?? rawBody,
      fallbackErrorMessage,
    );
    const errorCode = typeof data?.code === 'string' ? data.code : undefined;
    throw new ContactRequestError(safeError, errorCode);
  }

  return {
    success: true,
    messageId: data.messageId,
    submittedAt:
      typeof data.submittedAt === 'string'
        ? data.submittedAt
        : new Date().toISOString(),
    deliveryStatus:
      typeof data.deliveryStatus === 'string' ? data.deliveryStatus : undefined,
  };
}
