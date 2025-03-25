<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json($testimonials);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'rating' => 'required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'order' => 'integer'
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json($testimonial, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        return response()->json($testimonial);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'content' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'order' => 'integer'
        ]);

        $testimonial->update($validated);

        return response()->json($testimonial);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
