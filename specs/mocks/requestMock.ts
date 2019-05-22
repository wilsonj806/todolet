/**
 * Mock Express Request object
 * =============================================================
 *
 */

export = (sessionData: any, body: any): object => ({
  session: sessionData,
  body,
});
