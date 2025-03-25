<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('phone_number', 'like', "%{$request->search}%");
            });
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $users = $query->paginate(10)
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'role' => $user->role,
                'status' => $user->status,
                'created_at' => $user->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' =>'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,moderator,writer,user',
            'status' => 'required|in:active,inactive',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number, // Fixed: was using email instead of phone_number
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone_number' =>'required|string|max:255|unique:users,phone_number,' . $user->id, // Fixed: missing comma
            'role' => 'required|in:admin,moderator,writer,user',
            'status' => 'required|in:active,inactive',
        ]);

        if ($request->password) {
            $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'role' => $request->role,
            'status' => $request->status,
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function updateStatus(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot change your own status.');
        }

        $user->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Status updated successfully.');
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:admin,moderator,writer,user',
        ]);

        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot change your own role.');
        }

        $user->update([
            'role' => $request->role
        ]);

        return back()->with('success', 'Role updated successfully.');
    }
}