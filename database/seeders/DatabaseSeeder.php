<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // First seed roles
        $this->call(RoleSeeder::class);

        // Get the user role ID
        $userRoleId = DB::table('roles')->where('name', 'user')->first()->id;

        // Update any existing users to have the user role
        DB::table('users')->whereNull('role_id')->update(['role_id' => $userRoleId]);

        // Now seed the rest
        $this->call([
            UserSeeder::class,
            CourseSeeder::class,
            SubCourseSeeder::class,
            BlogSeeder::class,
            UsersTableSeeder::class,
            CollegeSeeder::class,
        ]);
    }
}
