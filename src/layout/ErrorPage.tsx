import { useRouteError } from "react-router-dom"

const isErrorWithMessage = (
  error: any
): error is { message: string; statusText?: string } => {
  return (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as any).message === "string"
  )
}

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {isErrorWithMessage(error)
            ? error.statusText || error.message
            : "Unknown error"}
        </i>
      </p>
    </div>
  )
}

export default ErrorPage
