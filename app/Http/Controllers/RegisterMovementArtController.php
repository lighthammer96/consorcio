|<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloTrait;
use Illuminate\Http\Request;
use App\Http\Recopro\Register_movement_Articulo\Register_movement_ArticuloInterface;
use App\Http\Requests\Register_movement_ArticuloRequest;
class Register_movement_ArticuloController extends Controller
{
     use Register_movement_ArticuloTrait;

    public function __construct()
    {
//        $this->middleware('json');
    }

    public function all(Request $request, Register_movement_ArticuloInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idCategoria', 'descripcion as Categoria','estado'];
        return parseList($repo->search($s), $request, 'idCategoria', $params);
    }

   public function createUpdate($id, Register_movementInterface $repo, Request $request, OperationInterface $opRepo)
    {
       
        try {
            $data = $request->all();

            $idArticulo = $data['idArticulo'];
            $idArticulo = explode(',', $idArticulo);

            $idAlmacen = $data['idAlmacen'];
            $idAlmacen = explode(',', $idAlmacen);

            
            $idLocalizacion = $data['idLocalizacion'];
            $idLocalizacion = explode(',', $idLocalizacion);

            $cantidad = $data['cantidad'];
            $cantidad = explode(',', $cantidad);

            $costo = $data['costo'];
            $costo = explode(',', $costo);

            $costo_total = $data['costo_total'];
            $costo_total = explode(',', $costo_total);
            $lote="";
            if(isset($data['idLote'])){
                 $lote=null;
            }
            if ($idArticulo != '') {
                for ($i=0; $i < count($idArticulo) ; $i++) { 
                        $repo->create([
                        'idMovimiento' => $id,
                        'idArticulo' => $idArticulo[$i],
                        'idAlmacen' => $idAlmacen[$i],
                        'idLocalizacion' =>$idLocalizacion[$i],
                        'idLote' => $lote,
                        'cantidad' => $cantidad[$i],
                        'costo' => $costo[$i],
                        'costo_total' => $costo_total[$i],

                    ]);

                } 
            }
            
            DB::commit();
            return response()->json([
                'status' => true,
                'code' => $idMovimiento
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    } 

    

    public function destroy(Register_movement_ArticuloInterface $repo, Request $request)
    {
        $id = $request->input('idCategoria');
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    

    public function excel(Register_movement_ArticuloInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE CATEGORÍAS', 'Categoría');
    }
}
