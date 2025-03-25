<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Moderator
        User::create([
            'name' => 'John Moderator',
            'email' => 'moderator@awissen.com',
            'password' => Hash::make('password123'),
            'role' => 'moderator',
            'status' => 'active',
        ]);

        // Writer
        User::create([
            'name' => 'Sarah Writer',
            'email' => 'writer@awissen.com',
            'password' => Hash::make('password123'),
            'role' => 'writer',
            'status' => 'active',
        ]);

        // Regular Users
        User::create([
            'name' => 'Alex User',
            'email' => 'user1@awissen.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Maria User',
            'email' => 'user2@awissen.com',
            'password' => Hash::make('password123'),
            'role' => 'user',
            'status' => 'inactive',
        ]);

        // Another Admin for testing
        User::create([
            'name' => 'Admin Test',
            'email' => 'admin2@awissen.com',
            'password' => Hash::make('password123'),
            'role' => 'admin',
            'status' => 'active',
        ]);
    }
} 