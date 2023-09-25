<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class Permission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission) : Response
    {

        $userPermissions = get_user_permissions($request->user()->id);
        if(!in_array($permission, $userPermissions)) return redirect(RouteServiceProvider::HOME);

        return $next($request);
    }
}
