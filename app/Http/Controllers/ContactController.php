<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Validator;
use App\Models\Setting;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Handle the contact form submission
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function index()
    {
        return Inertia::render('Contact', [
             'settings' => Setting::all()->pluck('value', 'key')
        ]);
    }

    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Store contact message in database if needed
        // $contact = Contact::create($request->all());

        // Send email notification
        try {
            Mail::to(config('mail.from.address'))->send(new ContactFormMail($request->all()));
            
            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message. We will get back to you soon!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, there was an error sending your message. Please try again later.'
            ], 500);
        }
    }
}