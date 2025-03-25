<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Certificate;
use App\Models\User;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificate::with(['user', 'subCourse'])
            ->where('is_active', true)
            ->orderBy('issue_date', 'desc')
            ->get();

        return response()->json($certificates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sub_course_id' => 'required|exists:sub_courses,id',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'pdf_path' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $user = User::findOrFail($validated['user_id']);
        $validated['certificate_id'] = Certificate::generateCertificateId(
            $user->first_name,
            $user->last_name
        );

        $certificate = Certificate::create($validated);

        return response()->json($certificate, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        $certificate->load(['user', 'subCourse']);
        return response()->json($certificate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'sub_course_id' => 'sometimes|required|exists:sub_courses,id',
            'issue_date' => 'sometimes|required|date',
            'expiry_date' => 'nullable|date|after:issue_date',
            'pdf_path' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $certificate->update($validated);

        return response()->json($certificate);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();
        return response()->json(null, 204);
    }

    public function verify($certificateId)
    {
        $certificate = Certificate::with(['user', 'subCourse'])
            ->where('certificate_id', $certificateId)
            ->where('is_active', true)
            ->first();

        if (!$certificate) {
            return response()->json(['message' => 'Certificate not found or invalid'], 404);
        }

        return response()->json($certificate);
    }

    public function byUser(User $user)
    {
        $certificates = $user->certificates()
            ->with('subCourse')
            ->where('is_active', true)
            ->orderBy('issue_date', 'desc')
            ->get();

        return response()->json($certificates);
    }
}
