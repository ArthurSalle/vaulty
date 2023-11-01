import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import { Button } from '../../../components/ui/button'

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  if (isRouteErrorResponse(error)) {
    return (
      <div className='flex flex-col h-screen gap-4 justify-center items-center'>
        <h1 className='text-3xl'>Oops! Something went wrong 🫠</h1>

        <p className='text-lg'>
          <i>
            {error.status} {error.statusText && error.statusText}
          </i>
        </p>

        <Button onClick={() => navigate(-1)}>Go back!</Button>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col h-screen gap-4 justify-center items-center'>
        <h1 className='text-3xl'>Oops! Something went wrong 🫠</h1>

        <Button onClick={() => navigate(-1)}>Go back!</Button>
      </div>
    )
  }
}
