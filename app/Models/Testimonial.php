<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'company',
        'content',
        'image',
        'rating',
        'is_active',
        'order'
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}
