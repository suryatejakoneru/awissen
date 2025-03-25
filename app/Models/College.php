<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class College extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'city',
        'state',
        'country',
        'phone',
        'email',
        'website',
        'logo',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($college) {
            if (empty($college->slug)) {
                $college->slug = Str::slug($college->name);
            }
        });

        static::updating(function ($college) {
            if ($college->isDirty('name') && empty($college->slug)) {
                $college->slug = Str::slug($college->name);
            }
        });
    }

    // Relationships
    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function students()
    {
        return $this->hasMany(User::class, 'college_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Accessors & Mutators
    public function getFullAddressAttribute()
    {
        return "{$this->address}, {$this->city}, {$this->state}, {$this->country}";
    }
}
