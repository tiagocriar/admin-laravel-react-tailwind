<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles) : Response
    {
        $user = Auth::user();

        foreach($roles as $role) {
            if($user->role === $role) return $next($request);
        }

        if ($request->isMethod('post')) {
            return response()->json([
                'success' => false,
                'msg' => 'Seu usuário não tem acesso a esse recurso.'
            ], 403);
        }

        return redirect(RouteServiceProvider::HOME);
    }
}
