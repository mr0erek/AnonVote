<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Crypt;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'external_user_id',
        'display_name',
        'encrypted_identity',
        'last_login',
    ];

    protected $hidden = [
        'encrypted_identity',
    ];

    protected $casts = [
        'last_login' => 'datetime',
    ];

    public function polls()
    {
        return $this->hasMany(Poll::class, 'creator_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function setEncryptedIdentityAttribute($value)
    {
        $this->attributes['encrypted_identity'] = Crypt::encryptString($value);
    }

    public function getEncryptedIdentityAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
