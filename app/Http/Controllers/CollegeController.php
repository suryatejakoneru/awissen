<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\College;

class CollegeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $colleges = College::where('is_active', true)
            ->orderBy('name')
            ->get();

        return response()->json($colleges);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:colleges',
            'description' => 'nullable|string',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $college = College::create($validated);

        return response()->json($college, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(College $college)
    {
        return response()->json($college);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, College $college)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:colleges,slug,' . $college->id,
            'description' => 'nullable|string',
            'address' => 'sometimes|required|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
            'country' => 'sometimes|required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'logo' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $college->update($validated);

        return response()->json($college);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(College $college)
    {
        $college->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = $request->get('query');
        
        $colleges = College::where('is_active', true)
            ->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('city', 'like', "%{$query}%")
                  ->orWhere('state', 'like', "%{$query}%")
                  ->orWhere('country', 'like', "%{$query}%");
            })
            ->orderBy('name')
            ->get();

        return response()->json($colleges);
    }
}
