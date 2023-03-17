<?php

namespace App\Http\Middleware;

use App\Http\Recopro\Module\ModuleInterface;
use Closure;
use Illuminate\Support\Facades\Request;

class PermissionMiddleware
{
    protected $module;


    public function __construct(ModuleInterface $moduleInterface)
    {
        $this->module = $moduleInterface;
    }
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $profile_id = auth()->user()->profile_id;
        $url = Request::segment(1);

        $permission = $this->module->getByProfileUrl($profile_id, $url);

        if (!isset($permission))
        {
            if ($request->ajax())
            {
                return response('Unauthorized.', 401);
            }
            else
            {
                return redirect()->guest('/');
            }
        }

        return $next($request);
    }
}
