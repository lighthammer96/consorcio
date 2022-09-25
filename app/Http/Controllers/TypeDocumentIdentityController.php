<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 10:34 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\TypeDocumentIdentity\TypeDocumentIdentityInterface;

class TypeDocumentIdentityController extends Controller
{
    public function getAll(TypeDocumentIdentityInterface $repo)
    {
        return parseSelect($repo->all(), 'IdTipoDocumentoIdentidad', 'Descripcion');
    }
}