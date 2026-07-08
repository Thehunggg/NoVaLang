export type OAuthProvider = "google" | "facebook" | "instagram" | "apple";

export interface LocalAuthIdentity {
  name: string;
  email: string;
}

export class AuthSetupRequiredError extends Error {
  constructor(public provider: OAuthProvider, public missingVariables: string[]) {
    super(`OAuth setup required for ${provider}: ${missingVariables.join(", ")}`);
    this.name = "AuthSetupRequiredError";
  }
}

const authApiUrl = import.meta.env.VITE_AUTH_API_URL?.trim();

export const authService = {
  startOAuth(provider: OAuthProvider): void {
    if (!authApiUrl) throw new AuthSetupRequiredError(provider, ["VITE_AUTH_API_URL"]);
    const endpoint = new URL(`oauth/${provider}`, authApiUrl.endsWith("/") ? authApiUrl : `${authApiUrl}/`);
    endpoint.searchParams.set("redirectTo", `${window.location.origin}/`);
    window.location.assign(endpoint.toString());
  },

  signInWithEmail(email: string): LocalAuthIdentity {
    const name = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) || "Explorer";
    return { name, email };
  },

  signUpWithEmail(name: string, email: string): LocalAuthIdentity {
    return { name: name.trim(), email };
  }
};
