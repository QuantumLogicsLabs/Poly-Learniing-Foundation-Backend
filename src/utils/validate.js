const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v) => (typeof v === 'string' ? v.trim() : '');

function isEmail(value) {
  return EMAIL_RE.test(str(value)) && str(value).length <= 200;
}

// Collects field errors; returns null when everything is valid.
function check(rules) {
  const errors = {};
  for (const [field, [ok, message]] of Object.entries(rules)) {
    if (!ok) errors[field] = message;
  }
  return Object.keys(errors).length ? errors : null;
}

module.exports = { str, isEmail, check };
