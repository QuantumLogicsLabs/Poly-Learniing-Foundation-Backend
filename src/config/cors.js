const cors = require('cors');

/**
 * CLIENT_ORIGIN lists the website origins allowed to call the API, e.g.
 *   https://plf.quantumlogicslimited.com,https://plf-*-myteam.vercel.app
 * "*" inside an entry is a wildcard; a lone "*" allows every origin.
 *
 * Deliberately forgiving, because the value is usually pasted into the Vercel dashboard:
 * entries may be separated by commas, spaces, semicolons or new lines; quotes, trailing
 * slashes, a missing "https://" and a pasted "CLIENT_ORIGIN=" prefix are all ignored.
 */
function parseOrigins(value) {
  const list = String(value ?? '')
    .replace(/^\s*CLIENT_ORIGIN\s*=\s*/i, '')
    .split(/[\s,;]+/)
    .map((o) => o.replace(/^["'`]+|["'`]+$/g, '').replace(/\/+$/, ''))
    .filter(Boolean)
    .map((o) => (o === '*' || /^https?:\/\//i.test(o) ? o : `https://${o}`));
  return list.length ? list : ['http://localhost:5173'];
}

const toPattern = (origin) =>
  new RegExp('^' + origin.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*') + '$', 'i');

const allowedOrigins = parseOrigins(process.env.CLIENT_ORIGIN);
const allowAll = allowedOrigins.includes('*');
const patterns = allowedOrigins.filter((o) => o !== '*').map(toPattern);
const reported = new Set();

function isAllowed(origin) {
  // Requests without an Origin header (curl, server-to-server, same-origin) are allowed.
  if (!origin || allowAll) return true;
  return patterns.some((re) => re.test(origin));
}

const corsMiddleware = cors({
  origin(origin, done) {
    const ok = isAllowed(origin);
    if (!ok && !reported.has(origin) && reported.size < 50) {
      reported.add(origin);
      console.warn(`[cors] blocked origin ${origin}. Add it to CLIENT_ORIGIN (currently: ${allowedOrigins.join(', ')})`);
    }
    done(null, ok);
  },
});

module.exports = { corsMiddleware, allowedOrigins, parseOrigins, isAllowed };
