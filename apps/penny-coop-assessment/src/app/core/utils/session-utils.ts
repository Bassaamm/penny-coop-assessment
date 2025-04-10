import Cookies from 'js-cookie';

export type Session = {
  access_token: string;
  refresh_token: string;
};

const SESSION_COOKIE_KEY = 'app_session';

export function getSession(): Session | null {
  const sessionCookie = Cookies.get(SESSION_COOKIE_KEY);
  return sessionCookie ? JSON.parse(sessionCookie) : null;
}

export function setSession(sessionTokens: Session): void {
  Cookies.set(SESSION_COOKIE_KEY, JSON.stringify(sessionTokens), {
    sameSite: 'lax',
    expires: 1 / 3,
  });
}

export function deleteSession(): void {
  Cookies.remove(SESSION_COOKIE_KEY);
}
