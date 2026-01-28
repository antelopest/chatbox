export class HttpError<T = unknown> extends Error {
  constructor(
    public readonly status: number,
    public readonly payload: T,
  ) {
    super(`HTTP Error ${status}`);
  }
}
