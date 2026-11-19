import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/venaryData';
import { useLanguage } from '../i18n/LanguageContext';
import {
  ContactRequestError,
  extractSafeErrorMessage,
  submitContactRequest,
  validateContactForm,
  type ContactValidationErrors,
} from '../services/contactService';
import type { ContactFormValues } from '../types/venary';
import { VenaryLogo } from './VenaryLogo';

interface ContactSectionProps {
  preselectedProjectId: string;
}

export function ContactSection({ preselectedProjectId }: ContactSectionProps) {
  const { language, t } = useLanguage();
  const options = t.contact.form.projectTypeOptions;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    preselectedProjectId || options[0].id,
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitErrorCode, setSubmitErrorCode] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const formStartedAtRef = useRef<number>(Date.now());

  const selectedProjectLabel =
    options.find((opt) => opt.id === selectedProjectId)?.label ||
    options[0].label;

  useEffect(() => {
    if (preselectedProjectId) {
      setSelectedProjectId(preselectedProjectId);
      setErrors((prev) => ({ ...prev, projectType: undefined }));
      setIsSuccess(false);
    }
  }, [preselectedProjectId]);

  // Re-valide proprement les messages d'erreur déjà affichés lors d'un changement de langue
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const currentValues: ContactFormValues = {
        fullName,
        email,
        projectType: selectedProjectLabel,
        message,
      };
      const refreshed = validateContactForm(
        currentValues,
        t.contact.form.validation,
      );
      setErrors((prev) => ({
        fullName: prev.fullName ? refreshed.fullName : undefined,
        email: prev.email ? refreshed.email : undefined,
        projectType: prev.projectType ? refreshed.projectType : undefined,
        message: prev.message ? refreshed.message : undefined,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const clearSubmitError = () => {
    if (submitError) setSubmitError(null);
    if (submitErrorCode) setSubmitErrorCode(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError(null);
    setSubmitErrorCode(null);

    const formValues: ContactFormValues = {
      fullName,
      email,
      projectType: selectedProjectLabel,
      message,
    };

    const validationErrors = validateContactForm(
      formValues,
      t.contact.form.validation,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactRequest(
        {
          ...formValues,
          website: honeypot,
          formStartedAt: formStartedAtRef.current,
          locale: language,
        },
        t.contact.form.networkError,
      );

      setIsSuccess(true);
      setFullName('');
      setEmail('');
      setSelectedProjectId(options[0].id);
      setMessage('');
      setHoneypot('');
      formStartedAtRef.current = Date.now();
    } catch (error) {
      const errorCode =
        error instanceof ContactRequestError && typeof error.code === 'string'
          ? error.code
          : null;
      const mappedByCode =
        errorCode &&
        Object.prototype.hasOwnProperty.call(
          t.contact.form.errorByCode,
          errorCode,
        )
          ? extractSafeErrorMessage(
              t.contact.form.errorByCode[errorCode],
              t.contact.form.genericError,
            )
          : null;
      setSubmitErrorCode(errorCode);
      setSubmitError(
        mappedByCode ??
          extractSafeErrorMessage(error, t.contact.form.genericError),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    setSubmitError(null);
    setSubmitErrorCode(null);
    formStartedAtRef.current = Date.now();
  };

  const getSafeFieldError = (
    rawError: unknown,
    fallback: string,
  ): string | undefined => {
    if (!rawError) {
      return undefined;
    }
    return extractSafeErrorMessage(rawError, fallback);
  };

  const safeFullNameError = getSafeFieldError(
    errors.fullName,
    t.contact.form.validation.fullName,
  );
  const safeEmailError = getSafeFieldError(
    errors.email,
    t.contact.form.validation.emailInvalid,
  );
  const safeProjectTypeError = getSafeFieldError(
    errors.projectType,
    t.contact.form.validation.projectTypeRequired,
  );
  const safeMessageError = getSafeFieldError(
    errors.message,
    t.contact.form.validation.messageMinLength,
  );

  const displayedSubmitError =
    submitErrorCode &&
    Object.prototype.hasOwnProperty.call(
      t.contact.form.errorByCode,
      submitErrorCode,
    )
      ? extractSafeErrorMessage(
          t.contact.form.errorByCode[submitErrorCode],
          t.contact.form.genericError,
        )
      : submitError
        ? extractSafeErrorMessage(submitError, t.contact.form.genericError)
        : null;

  const charactersUnitLabel =
    typeof t.contact.form.charactersUnit === 'string'
      ? t.contact.form.charactersUnit
      : 'caractères';

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Colonne gauche : Présentation & Informations d'échange */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <VenaryLogo surface="light" tone="crimson" size="xs" />
              <p className="text-sm font-medium text-[#D91E2A]">
                {t.contact.kicker}
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113] text-balance leading-[1.15] mb-5">
              {t.contact.heading}
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed mb-10">
              {t.contact.intro}
            </p>

            <div className="border-t border-zinc-200 divide-y divide-zinc-200">
              <div className="py-5 flex items-start gap-4">
                <Clock
                  className="w-5 h-5 text-[#D91E2A] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-[#111113]">
                    {t.contact.availabilityLabel}
                  </p>
                  <p className="text-sm text-zinc-600 mt-0.5">
                    {t.contact.availabilityValue} · {t.contact.responseDelayValue}
                  </p>
                </div>
              </div>

              {COMPANY_INFO.email && (
                <div className="py-5 flex items-start gap-4">
                  <Mail
                    className="w-5 h-5 text-[#D91E2A] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#111113]">
                      {t.contact.emailLabel}
                    </p>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm text-zinc-600 hover:text-[#D91E2A] transition-colors mt-0.5 inline-block"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              )}

              {COMPANY_INFO.phone && (
                <div className="py-5 flex items-start gap-4">
                  <Phone
                    className="w-5 h-5 text-[#D91E2A] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#111113]">
                      {t.contact.phoneLabel}
                    </p>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sm text-zinc-600 hover:text-[#D91E2A] transition-colors mt-0.5 inline-block"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              )}

              {COMPANY_INFO.location && (
                <div className="py-5 flex items-start gap-4">
                  <MapPin
                    className="w-5 h-5 text-[#D91E2A] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#111113]">
                      {t.contact.locationLabel}
                    </p>
                    <p className="text-sm text-zinc-600 mt-0.5">
                      {COMPANY_INFO.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite : Formulaire de contact connecté à Resend */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] border border-zinc-200 rounded-sm p-6 sm:p-10">
              {isSuccess ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-white border border-zinc-200 rounded-sm p-8 text-center"
                >
                  <div className="flex flex-col items-center gap-3 mb-4">
                    <VenaryLogo surface="light" tone="crimson" size="sm" />
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D91E2A]">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span>{t.contact.form.successBadge}</span>
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#111113] mb-3">
                    {t.contact.form.successHeading}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-700 max-w-md mx-auto mb-7 leading-relaxed">
                    {t.contact.form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetSuccess}
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-[#111113] hover:bg-[#D91E2A] text-white text-sm font-medium rounded-sm transition-colors cursor-pointer"
                  >
                    {t.contact.form.sendAnotherButton}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Champ honeypot invisible anti-spam */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Nom complet */}
                    <div>
                      <label
                        htmlFor="contact-fullname"
                        className="block text-sm font-medium text-[#111113] mb-2"
                      >
                        {t.contact.form.fullNameLabel}{' '}
                        <span className="text-[#D91E2A]">*</span>
                      </label>
                      <input
                        id="contact-fullname"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={isSubmitting}
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                          clearSubmitError();
                        }}
                        placeholder={t.contact.form.fullNamePlaceholder}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? 'error-fullname' : undefined
                        }
                        className={`w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D91E2A]/20 transition-colors disabled:opacity-60 ${
                          errors.fullName
                            ? 'border-[#D91E2A]'
                            : 'border-zinc-300 focus:border-[#D91E2A]'
                        }`}
                      />
                      {safeFullNameError && (
                        <p
                          id="error-fullname"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#D91E2A]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{safeFullNameError}</span>
                        </p>
                      )}
                    </div>

                    {/* Adresse e-mail */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#111113] mb-2"
                      >
                        {t.contact.form.emailLabel}{' '}
                        <span className="text-[#D91E2A]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isSubmitting}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                          clearSubmitError();
                        }}
                        placeholder={t.contact.form.emailPlaceholder}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D91E2A]/20 transition-colors disabled:opacity-60 ${
                          errors.email
                            ? 'border-[#D91E2A]'
                            : 'border-zinc-300 focus:border-[#D91E2A]'
                        }`}
                      />
                      {safeEmailError && (
                        <p
                          id="error-email"
                          role="alert"
                          className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#D91E2A]"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{safeEmailError}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Type de projet */}
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-sm font-medium text-[#111113] mb-2"
                    >
                      {t.contact.form.projectTypeLabel}{' '}
                      <span className="text-[#D91E2A]">*</span>
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      required
                      disabled={isSubmitting}
                      value={selectedProjectId}
                      onChange={(e) => {
                        setSelectedProjectId(e.target.value);
                        if (errors.projectType) {
                          setErrors((prev) => ({
                            ...prev,
                            projectType: undefined,
                          }));
                        }
                        clearSubmitError();
                      }}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={
                        errors.projectType ? 'error-project-type' : undefined
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#111113] focus:outline-none focus:ring-2 focus:ring-[#D91E2A]/20 transition-colors disabled:opacity-60 ${
                        errors.projectType
                          ? 'border-[#D91E2A]'
                          : 'border-zinc-300 focus:border-[#D91E2A]'
                      }`}
                    >
                      {options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {safeProjectTypeError && (
                      <p
                        id="error-project-type"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#D91E2A]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{safeProjectTypeError}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-[#111113]"
                      >
                        {t.contact.form.messageLabel}{' '}
                        <span className="text-[#D91E2A]">*</span>
                      </label>
                      <span className="text-xs text-zinc-400 tabular-nums">
                        {message.trim().length} {charactersUnitLabel}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                        clearSubmitError();
                      }}
                      placeholder={t.contact.form.messagePlaceholder}
                      aria-invalid={Boolean(safeMessageError)}
                      aria-describedby={
                        safeMessageError ? 'error-message' : undefined
                      }
                      className={`w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#D91E2A]/20 transition-colors resize-y disabled:opacity-60 ${
                        safeMessageError
                          ? 'border-[#D91E2A]'
                          : 'border-zinc-300 focus:border-[#D91E2A]'
                      }`}
                    />
                    {safeMessageError && (
                      <p
                        id="error-message"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#D91E2A]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{safeMessageError}</span>
                      </p>
                    )}
                  </div>

                  {displayedSubmitError && (
                    <div
                      role="alert"
                      className="p-4 bg-red-50 border border-[#D91E2A] rounded-sm flex items-start gap-2.5 text-sm text-[#980E18]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{displayedSubmitError}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                      {t.contact.form.requiredNotePrefix}{' '}
                      <span className="text-[#D91E2A]">*</span>{' '}
                      {t.contact.form.requiredNoteSuffix}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#D91E2A] hover:bg-[#B51621] disabled:opacity-65 disabled:cursor-not-allowed text-white text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 shrink-0 animate-spin" aria-hidden="true" />
                      ) : (
                        <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {isSubmitting
                          ? t.contact.form.submittingButton
                          : t.contact.form.submitButton}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
