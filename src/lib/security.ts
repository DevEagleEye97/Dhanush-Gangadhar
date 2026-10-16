/**
 * Application Security Utilities
 * 
 * Provides runtime sanitization against:
 * - Cross-Site Scripting (XSS) via `javascript:`, `data:`, or `vbscript:` URI schemes
 * - Open Redirects & Protocol Hijacking
 * - Reverse Tabnabbing (enforcing strict noopener noreferrer)
 * - Denial-of-Service / Buffer Exhaustion via unbounded input lengths
 */

const ALLOWED_PROTOCOLS = new Set(["https:", "http:", "mailto:"]);

/**
 * Validates and sanitizes URLs before rendering in href attributes.
 * Rejects javascript:, data:, vbscript:, and protocol-relative (//) URLs.
 */
export function sanitizeUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl || typeof rawUrl !== "string") {
    return null;
  }

  const trimmed = rawUrl.trim();

  // Allow safe relative site paths
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  // Allow mailto links
  if (trimmed.toLowerCase().startsWith("mailto:")) {
    // Validate email format inside mailto
    const emailPart = trimmed.slice(7).split("?")[0].trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(emailPart)) {
      return trimmed;
    }
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (ALLOWED_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return parsed.toString();
    }
  } catch {
    // Invalid URL structure
    return null;
  }

  return null;
}

/**
 * Sanitizes command terminal or user text inputs to prevent control character injection,
 * ANSI injection, and memory bloat.
 */
export function sanitizeInput(input: string, maxLength = 120): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Truncate to maximum permissible length to prevent DoS
  const truncated = input.slice(0, maxLength);

  // Strip non-printable ASCII control characters (keep space and normal chars)
  return truncated.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

/**
 * Safe link attributes for external targets to mitigate Reverse Tabnabbing.
 */
export const SAFE_EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
