<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'title',
        'description',
        'vote_type',
        'is_active',
        'upvotes_count',
        'downvotes_count',
        'total_voters',
        'expires_at',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'expires_at' => 'datetime',
    ];

    protected $appends = ['user_vote'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function getUserVoteAttribute()
    {
        if (auth()->check()) {
            $vote = $this->votes()->where('user_id', auth()->id())->first();
            return $vote ? $vote->vote_type : null;
        }
        return null;
    }

    public function getUpvotePercentageAttribute()
    {
        if ($this->total_voters == 0) {
            return 0;
        }

        return round(($this->upvotes_count / $this->total_voters) * 100, 1);
    }

    public function getDownvotePercentageAttribute()
    {
        if ($this->total_voters == 0) {
            return 0;
        }

        return round(($this->downvotes_count / $this->total_voters) * 100, 1);
    }
}
