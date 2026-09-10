import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

/**
 * Vite replaces `import.meta.env.VITE_*` with a literal at build time, and
 * when the variable is missing it writes `undefined` and carries on. That is
 * how a build with no EmailJS credentials shipped a contact form that called
 * `send(undefined, undefined, ..., undefined)` and could never succeed - the
 * deploy was green, the form was dead, and nothing anywhere said so.
 *
 * Presence alone turned out not to be enough either. Pasting a variable's
 * *name* into the value box of a hosting dashboard is an ordinary slip, and
 * it produces a build that looks perfectly configured and still cannot send:
 * EmailJS simply answers "template not found". So each value is also checked
 * against the shape it is supposed to have.
 *
 * The build refuses to produce that artefact. A failed deploy leaves the
 * previous working one live, which is strictly better than replacing it with
 * a form that silently drops every message a recruiter types.
 */
const CONTACT_ENV = [
  {
    key: 'VITE_EMAILJS_SERVICE_ID',
    valid: (v) => v.startsWith('service_'),
    shape: 'starts with `service_`, from EmailJS -> Email Services',
  },
  {
    key: 'VITE_EMAILJS_TEMPLATE_ID',
    valid: (v) => v.startsWith('template_'),
    shape: 'starts with `template_`, from EmailJS -> Email Templates',
  },
  {
    key: 'VITE_EMAILJS_PUBLIC_KEY',
    // No fixed prefix on this one, so it only rejects the obvious mistakes.
    valid: (v) => v.length >= 12 && !v.startsWith('VITE_'),
    shape: 'a ~17-character token, from EmailJS -> Account -> General',
  },
];

function requireContactEnv() {
  return {
    name: 'require-contact-env',
    apply: 'build',
    configResolved(config) {
      const bad = CONTACT_ENV.flatMap(({ key, valid, shape }) => {
        const value = config.env[key];
        if (!value) return [`  ${key} is missing - ${shape}`];
        if (!valid(value)) return [`  ${key} = "${value}" does not look right - ${shape}`];
        return [];
      });
      if (bad.length === 0) return;
      throw new Error(
        `\nThe contact form cannot send with these credentials, so this build is refused:\n` +
          `${bad.join('\n')}\n\n` +
          `Set them in Netlify under Site configuration -> Environment variables\n` +
          `(scope: all deploy contexts), or in a local .env - see .env.example.\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), requireContactEnv()],
  base: "/",
  server: {
    historyApiFallback: true,
  },
});
