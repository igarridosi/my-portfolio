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
 * So the build refuses to produce that artefact. A failed deploy leaves the
 * previous working one live, which is strictly better than replacing it with
 * a form that silently drops every message a recruiter types.
 */
const CONTACT_ENV = [
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY',
];

function requireContactEnv() {
  return {
    name: 'require-contact-env',
    apply: 'build',
    configResolved(config) {
      const missing = CONTACT_ENV.filter((key) => !config.env[key]);
      if (missing.length === 0) return;
      throw new Error(
        `\nContact form credentials missing: ${missing.join(', ')}.\n` +
          `The form cannot send anything without them, so this build is refused.\n` +
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
