<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sub_course_id',
        'certificate_code',
        'issue_date',
    ];

    protected $casts = [
        'issue_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subCourse()
    {
        return $this->belongsTo(SubCourse::class);
    }

    public static function generateCertificateCode($name, $courseTitle = null)
    {
        $random = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
        $initials = strtoupper(substr($name, 0, 1));
        $monthYear = date('my');
        
        $courseCode = '';
        if ($courseTitle) {
            $courseCode = strtoupper(substr($courseTitle, 0, 3));
        }
        
        return "AW{$random}{$initials}{$courseCode}{$monthYear}";
    }
}
