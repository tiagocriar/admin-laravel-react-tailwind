<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $share = [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'permissions' => get_user_permissions($request->user()->id ?? null)
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];

        if ($request->session()->has('success')) {
            $share['flash']['success'] = fn () => $request->session()->get('success');
        }

        if ($request->session()->has('error')) {
            $share['flash']['error'] = fn () => $request->session()->get('error');
        }

        return $share;
    }
}
