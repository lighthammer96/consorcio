<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 18/10/2017
 * Time: 11:52 AM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\DocumentType\DocumentTypeInterface;
use Illuminate\Http\Request;

class DocumentTypeController extends Controller
{
    public function all(DocumentTypeInterface $repo)
    {
        return parseSelect($repo->all(), 'IdTipoDocumento', 'Descripcion');
    }

    public function getDocumentType(Request $request, DocumentTypeInterface $repo)
    {
        try {
            $filter = $request->all();
            $params = ['IdTipoDocumento', 'Descripcion', 'EquivalenciaSunat'];
            $info = parseDataList($repo->search($filter), $request, 'IdTipoDocumento', $params, 'ASC');
            $data = $info[1];

            return response()->json([
                'Result' => 'OK',
                'TotalRecordCount' => $info[0],
                'Records' => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'Result' => 'ERROR',
                'Message' => [$e->getMessage()]
            ]);
        }
    }
}