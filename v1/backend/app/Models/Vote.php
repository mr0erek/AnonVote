<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'poll_id',
        'user_id',
        'encrypted_user_hash',
        'vote_type',
    ];

    public function poll()
    {
        return $this->belongsTo(Poll::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($vote) {
            $vote->encrypted_user_hash = Hash::make($vote->user_id . $vote->poll_id . config('app.key'));
        });
    }
}
