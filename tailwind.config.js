/** @type {import('tailwindcss').Config} */
// Wes Financial Auto — Tailwind theme.
// Colors point to CSS variables in styles/tokens.css so there is ONE source of truth.
// Editing tokens.css updates both vanilla CSS and Tailwind classes.

module.exports = {
  darkMode: 'class',
  content: ['./**/*.{html,js,jsx,ts,tsx}', '!./node_modules/**'],
  theme: {
    extend: {
      colors: {
        // surfaces
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          inset: 'var(--surface-inset)',
        },
        // text
        ink: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          disabled: 'var(--text-disabled)',
          inverse: 'var(--text-inverse)',
        },
        // borders
        line: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          stronger: 'var(--border-stronger)',
        },
        // brand / semantic
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
        },
        info: 'var(--info)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        highlight: 'var(--highlight)',
        // raw brand
        brand: {
          red: 'var(--red)',
          navy: 'var(--navy)',
          blue: 'var(--blue)',
          aqua: 'var(--aqua)',
          mint: 'var(--mint)',
          dark: 'var(--deep-dark)',
        },
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        '2xs':  'var(--fs-2xs)',
        xs:     'var(--fs-xs)',
        sm:     'var(--fs-sm)',
        base:   'var(--fs-base)',
        md:     'var(--fs-md)',
        lg:     'var(--fs-lg)',
        xl:     'var(--fs-xl)',
        '2xl':  'var(--fs-2xl)',
        '3xl':  'var(--fs-3xl)',
        '4xl':  'var(--fs-4xl)',
        '5xl':  'var(--fs-5xl)',
      },
      spacing: {
        0:'var(--space-0)',1:'var(--space-1)',2:'var(--space-2)',3:'var(--space-3)',
        4:'var(--space-4)',5:'var(--space-5)',6:'var(--space-6)',8:'var(--space-8)',
        10:'var(--space-10)',12:'var(--space-12)',16:'var(--space-16)',20:'var(--space-20)',
        24:'var(--space-24)',32:'var(--space-32)',
        gutter:'var(--gutter)', section:'var(--section-y)',
      },
      borderRadius: {
        xs:'var(--radius-xs)', sm:'var(--radius-sm)', DEFAULT:'var(--radius)',
        md:'var(--radius-md)', lg:'var(--radius-lg)', xl:'var(--radius-xl)', full:'var(--radius-full)',
      },
      boxShadow: {
        sm:'var(--shadow-sm)', md:'var(--shadow-md)', lg:'var(--shadow-lg)', pop:'var(--shadow-pop)',
      },
      maxWidth: {
        container: 'var(--container)',
        narrow: 'var(--container-narrow)',
      },
      letterSpacing: {
        tighter:'var(--ls-tighter)', tight:'var(--ls-tight)',
        wide:'var(--ls-wide)', wider:'var(--ls-wider)', widest:'var(--ls-widest)',
      },
      lineHeight: {
        tight:'var(--lh-tight)', snug:'var(--lh-snug)',
        normal:'var(--lh-normal)', relaxed:'var(--lh-relaxed)',
      },
      transitionTimingFunction: {
        out:'var(--ease-out)', 'in-out':'var(--ease-in-out)', snap:'var(--ease-snap)',
      },
      transitionDuration: {
        fast:'120ms', snap:'180ms', base:'250ms', slow:'400ms', slower:'800ms',
      },
      zIndex: {
        dropdown:'1000', sticky:'1100', nav:'1200', overlay:'1300', modal:'1400', toast:'1500',
      },
    },
  },
  plugins: [],
};
