<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubCourse;
use App\Models\Course;

class SubCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subCourses = SubCourse::with('course')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json($subCourses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:sub_courses',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'duration_hours' => 'nullable|integer|min:0',
            'schedule' => 'nullable|array',
            'prerequisites' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'integer'
        ]);

        $subCourse = SubCourse::create($validated);

        return response()->json($subCourse, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCourse $subCourse)
    {
        $subCourse->load('course');
        return response()->json($subCourse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubCourse $subCourse)
    {
        $validated = $request->validate([
            'course_id' => 'sometimes|required|exists:courses,id',
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:sub_courses,slug,' . $subCourse->id,
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'duration_hours' => 'nullable|integer|min:0',
            'schedule' => 'nullable|array',
            'prerequisites' => 'nullable|array',
            'is_active' => 'boolean',
            'order' => 'integer'
        ]);

        $subCourse->update($validated);

        return response()->json($subCourse);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCourse $subCourse)
    {
        $subCourse->delete();
        return response()->json(null, 204);
    }

    public function byCourse(Course $course)
    {
        $subCourses = $course->activeSubCourses;
        return response()->json($subCourses);
    }
}
