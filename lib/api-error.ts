export class APIError extends Error {
  constructor(
    message: string,
    public status = 500,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }

  static fromError(error: unknown): APIError {
    if (error instanceof APIError) {
      return error
    }

    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return new APIError(message)
  }
}

export async function handleAPIError<T>(promise: Promise<T>): Promise<[T | null, APIError | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, APIError.fromError(error)]
  }
}

