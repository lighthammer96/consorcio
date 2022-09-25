<?php namespace App\Http\Recopro\User;

use App\Http\Recopro\Profile\Profile;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    use SoftDeletes;

    protected $table = 'ERP_Usuarios';

    protected $fillable = ['name', 'username', 'password', 'profile_id', 'expiration_password',
        'change_password_date', 'reset', 'supervisor'];

    protected $hidden = ['password', 'remember_token'];
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function user_supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor');
    } 
}
