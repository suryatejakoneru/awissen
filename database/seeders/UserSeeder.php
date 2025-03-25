<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Get role IDs
        $roleIds = DB::table('roles')->pluck('id', 'name');

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roleIds['admin'],
        ]);

        // Create moderator user
        User::create([
            'name' => 'Moderator User',
            'email' => 'moderator@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roleIds['moderator'],
        ]);

        // Create writer user
        User::create([
            'name' => 'Writer User',
            'email' => 'writer@example.com',
            'password' => Hash::make('password'),
            'role_id' => $roleIds['writer'],
        ]);

        // Create demo users
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'role_id' => $roleIds['user'],
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'password' => Hash::make('password'),
                'role_id' => $roleIds['user'],
            ],
            [
                'name' => 'Mike Johnson',
                'email' => 'mike@example.com',
                'password' => Hash::make('password'),
                'role_id' => $roleIds['user'],
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
} 