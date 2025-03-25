<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function adminDashboard()
    {
        return Inertia::render('admin/Dashboard');
    }

    public function moderatorDashboard()
    {
        return Inertia::render('moderator/Dashboard');
    }

    public function writerDashboard()
    {
        return Inertia::render('writer/Dashboard');
    }

    public function userDashboard()
    {
        return Inertia::render('dashboard/UserDashboard');
    }
} 