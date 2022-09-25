<?php namespace App\Http\Recopro\Entity;

use App\Http\Recopro\TypeDocumentIdentity\TypeDocumentIdentity;
use App\Http\Recopro\TypePerson\TypePerson;
use App\Http\Recopro\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 9:25 PM
 */
class Entity extends Model
{
    use SoftDeletes;

    protected $table = 'Entidad';

    protected $primaryKey = 'IdEntidad';

    protected $keyType = 'string';

    protected $fillable = ['IdEntidad', 'NombreEntidad', 'DireccionLegal', 'ApellidoPaterno', 'ApellidoMaterno',
        'Nombres', 'IdTipoPersona', 'IdTipoDocumentoIdentidad', 'Documento', 'RazonSocial', 'Tipo', 'is_client',
        'contact', 'contact_phone', 'is_provider',
        'user_created', 'user_updated', 'user_deleted', 'deleted_at'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at', 'user_created', 'user_updated', 'user_deleted'];

    public function user_c()
    {
        return $this->belongsTo(User::class, 'user_created');
    }

    public function user_u()
    {
        return $this->belongsTo(User::class, 'user_updated');
    }

    public function typePerson()
    {
        return $this->belongsTo(TypePerson::class, 'IdTipoPersona');
    }

    public function typeDocumentIdentity()
    {
        return $this->belongsTo(TypeDocumentIdentity::class, 'IdTipoDocumentoIdentidad');
    }
}