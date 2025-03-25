<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role_id !== $this->getRoleId($role)) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            
            // Redirect to appropriate dashboard based on user's role
            if ($request->user()) {
                $userRole = $this->getRoleName($request->user()->role_id);
                return match($userRole) {
                    'admin' => redirect('/admin/dashboard'),
                    'moderator' => redirect('/moderator/dashboard'),
                    'writer' => redirect('/writer/dashboard'),
                    default => redirect('/dashboard'),
                };
            }

            return redirect('/login');
        }

        return $next($request);
    }

    /**
     * Get role ID from role name.
     */
    private function getRoleId(string $role): int
    {
        return match($role) {
            'admin' => 1,
            'moderator' => 2,
            'writer' => 3,
            'user' => 4,
            default => 4,
        };
    }

    /**
     * Get role name from role ID.
     */
    private function getRoleName(int $roleId): string
    {
        return match($roleId) {
            1 => 'admin',
            2 => 'moderator',
            3 => 'writer',
            4 => 'user',
            default => 'user',
        };
    }
} 