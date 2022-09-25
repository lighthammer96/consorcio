<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Naturaleza\NaturalezaTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Naturaleza\NaturalezaInterface;
use App\Http\Requests\NaturalezaRequest;
class NaturalezaController extends Controller
{
     use NaturalezaTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }


    public function getAll(NaturalezaInterface $repo)
    {
        return parseSelect($repo->all(), 'idNaturaleza', 'descripcion');
    }
    public function data_form(NaturalezaInterface $repo)
    {
        $datos=parseSelectOnly($repo->all(), 'idNaturaleza', 'descripcion');
         return response()->json([
            'status' => true,
            'datos'=>$datos,
            
        ]);
    }

    // public function data_form(TypeInterface $typeRepo,ModeloInterface $modeloRepo, CategoryInterface $categoriaRepo, BrandInterface $brandRepo, FamilyInterface $familyRepo,SubFamilyInterface $subfamilyRepo ,HeadAccountanInterface $headRepo)
    // {
    //     $modelo = parseSelectOnly($modeloRepo->allActive(), 'idModelo', 'descripcion');
    //     $categoria = parseSelectOnly($categoriaRepo->allActive(), 'idCategoria', 'descripcion');
    //     $familia = parseSelectOnly($familyRepo->allActive(), 'idFamilia', 'descripcion');
    //     $subfamilia = parseSelectOnly($subfamilyRepo->allActive(), 'idSubFamilia', 'descripcion');
    //     $marca = parseSelectOnly($brandRepo->all(), 'id', 'description');
    //     $grupoContable = parseSelectOnly($headRepo->allActive(), 'idGrupoContableCabecera', 'descripcion'); 
    //     $types = parseSelectOnly($typeRepo->all(), 'id', 'description');
    //     return response()->json([
    //         'status' => true,
    //         'modelo' => $modelo,
    //         'categoria' => $categoria,
    //         'familia' => $familia,
    //         'subfamilia' => $subfamilia,
    //         'marca' => $marca,
    //         'grupocontable' => $grupoContable,
    //         'types' => $types,
    //     ]);
    // }
    
}
