<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            $exception = new NotFoundHttpException($exception->getMessage(), $exception);
        }

        if ($exception instanceof TokenMismatchException) {
            return redirect(route('login'))->withErrors([
                'error' => 'Hubo un problema al iniciar sesión. Por favor intente nuevamente'
            ]);
        }

        if ($exception instanceof QueryException) {
            return response()->view('errors.sql', ['error' => $exception->getMessage()]);
        }

        if ($exception instanceof \ErrorException) {
            dd($exception);
            return response()->view('errors.500', ['error' => $exception->getMessage()]);
        }

        // handle Angular routes when accessed directly from the browser without the need of the '#'
        if ($exception instanceof NotFoundHttpException) {

            $url = parse_url($request->url());

            $path = explode('/',$url['path']);
            if (empty($path[0])) {
                unset($path[0]);
                $path = array_values($path);
            }
            $path = $path[0];

            if (auth()->user()) {
                $validate = validatePermission($path);

                if (!$validate) {
                    if ($request->ajax()) {
                        return response('Unauthorized.', 401);
                    }
                    else {
                        return redirect()->guest('/');
                    }
                }

                $port = (isset($url['port'])) ? ':' . $url['port'] : '';
                $angular_url = $url['scheme'] . '://' . $url['host'] . $port . '/#' . $url['path'];

                return response()->redirectTo($angular_url);
            } else {
                return response()->redirectTo('/');
            }
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest(route('login'));
    }
}
