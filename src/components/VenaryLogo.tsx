interface VenaryLogoProps {
  /**
   * "light" : fond clair -> place le logo blanc officiel dans un cartouche rouge VENARY (#D91E2A) ou sombre (#111113)
   *           sans altérer ni ses couleurs blanches ni ses proportions d'origine.
   * "dark"  : fond sombre -> affiche directement le fichier SVG officiel sans fond additionnel.
   * "red"   : fond rouge VENARY -> affiche directement le fichier SVG officiel sans fond additionnel.
   */
  surface?: 'light' | 'dark' | 'red';
  tone?: 'crimson' | 'ink';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<VenaryLogoProps['size']>, string> = {
  xs: 'h-8',
  sm: 'h-10 sm:h-11',
  md: 'h-12 sm:h-14',
  lg: 'h-20 sm:h-24',
};

const PADDING_CLASSES: Record<NonNullable<VenaryLogoProps['size']>, string> = {
  xs: 'p-1.5',
  sm: 'p-2',
  md: 'p-2',
  lg: 'p-3',
};

export function VenaryLogo({
  surface = 'light',
  tone = 'crimson',
  size = 'md',
  className = '',
}: VenaryLogoProps) {
  const heightClass = SIZE_CLASSES[size];

  if (surface === 'dark' || surface === 'red') {
    return (
      <span className={`inline-flex items-center shrink-0 select-none ${className}`}>
        <img
          src="/assets/logo-venary.svg"
          alt="VENARY – Web & Design"
          width={683}
          height={752}
          className={`${heightClass} w-auto aspect-[683/752] object-contain`}
        />
      </span>
    );
  }

  const badgeBg = tone === 'ink' ? 'bg-[#111113]' : 'bg-[#D91E2A]';
  const paddingClass = PADDING_CLASSES[size];

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none rounded-sm ${badgeBg} ${paddingClass} ${className}`}
    >
      <img
        src="/assets/logo-venary.svg"
        alt="VENARY – Web & Design"
        width={683}
        height={752}
        className={`${heightClass} w-auto aspect-[683/752] object-contain`}
      />
    </span>
  );
}
