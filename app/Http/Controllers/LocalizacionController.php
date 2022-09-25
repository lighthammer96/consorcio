<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Localizacion\LocalizacionTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Localizacion\LocalizacionInterface;
use App\Http\Requests\LocalizacionRequest;
class LocalizacionController extends Controller
{
     use LocalizacionTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }


    public function getAll(LocalizacionInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }
     public function getDepartamento(LocalizacionInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodLocalizacion', 'cDepartamento');
    }
     public function getProvincia(LocalizacionInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodLocalizacion', 'cProvincia');
    }
    public function getDistrito(LocalizacionInterface $repo)
    {
        return parseSelect($repo->all(), 'cCodLocalizacion', 'cDistrito');
    }
    // public function TraerDepartamentos($id, LocalizacionInterface $repo)
    // {
    //    try {
    //         $data = $repo->TraerDepartamentos();

    //         return response()->json([
    //             'status' => true,
    //             'data' => $data
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }
    //  public function TraerProvincias($id, LocalizacionInterface $repo)
    // {
    //    try {
    //         $data = $repo->TraerProvincias($id);

    //         return response()->json([
    //             'status' => true,
    //             'data' => $data
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }
    // public function TraerDistritos($id, LocalizacionInterface $repo)
    // {
    //    try {
    //         $data = $repo->TraerDistritos($id);

    //         return response()->json([
    //             'status' => true,
    //             'data' => $data
    //         ]);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => $e->getMessage()
    //         ]);
    //     }
    // }

    
}
