<?php
/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 4/04/2017
 * Time: 12:24 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Brand\BrandInterface;
use App\Http\Recopro\Product\ProductInterface;
use App\Http\Recopro\Product\ProductTrait;
use App\Http\Recopro\ProductBrand\ProductBrandInterface;
use App\Http\Recopro\ProjectConsolidated\ProjectConsolidatedInterface;
use App\Http\Recopro\Stock\StockInterface;
use App\Http\Recopro\Type\TypeInterface;
use App\Http\Recopro\TypeRetention\TypeRetentionInterface;
use App\Http\Recopro\Unity\UnityInterface;
use App\Http\Requests\ProductRequest;
use App\Http\Recopro\Precios_producto\Precios_productoInterface;
use App\Http\Recopro\Modelo\ModeloInterface;
use App\Http\Recopro\Category\CategoryInterface;
use App\Http\Recopro\Family\FamilyInterface;
use App\Http\Recopro\SubFamily\SubFamilyInterface;
use App\Http\Recopro\HeadAccountan\HeadAccountanInterface;
use App\Http\Recopro\Articulo_Kit\Articulo_KitInterface;
use App\Http\Recopro\Carroceria\CarroceriaInterface;
use App\Http\Recopro\Measure\MeasureInterface;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProductController extends Controller
{
    use ProductTrait;

    public function __construct()
    {
//        $this->middleware('json', ['except' => ['data_form', 'createUpdate', 'find']]);
    }

    public function all(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'sale', 'state', 'description', 'matrix', 'code_article', 'code_matrix'];

        return parseList($repo->search($s), $request, 'id', $params);

    }

    public function data_form_dd(Precios_productoInterface $repo)
    {

        $userid = auth()->id();
        return response()->json([
            'status' => true,
            'userid' => $userid,

        ]);
    }


    public function createUpdate($id, ProductInterface $repo, ProductRequest $request, ProductBrandInterface $pbRepo, Articulo_KitInterface $kitrepo)
    {

        try {
            $data = $request->all();
            // print_r($data); exit;
            $data['code_article'] = strtoupper($data['code_article']);
            $data['code_matrix'] = strtoupper($data['code_matrix']);
            $data['color'] = strtoupper($data['color']);
            $data['description'] = strtoupper($data['description']);
            $data['description_detail'] = strtoupper($data['description_detail']);
            $w = $repo->findByCode($data['code_article']);
            if ($id != 0) {
                if ($w && $w->id != $id) {
                    throw new \Exception('Ya existe un Articulo con este código . Por favor ingrese otro código.');
                }
                // print_r($data);
                $repo->update($id, $data);
                $product = $repo->find($id);
                $code = $product->code_article;
                $ide = $product->id;

            } else {
                if ($w) {
                    throw new \Exception('Ya existe un Articulo con este código. Por favor ingrese otro código.');
                }
                $product = $repo->create($data);
                $ide = $product->id;
                $code = $product->code_article;
            }

            if ($data['cantidadKit'] != 'N') {
                $kitrepo->destroy($id);
                $idArticuloKitT = $data['idArticuloKit'];
                $idArticuloKit = explode(',', $idArticuloKitT);
                $cantidadKitT = $data['cantidadKit'];
                $cantidadKit = explode(',', $cantidadKitT);
                for ($i = 0; $i < count($idArticuloKit); $i++) {
                    $datKit = [];
                    $datKit['idArticuloKit'] = $ide;
                    $datKit['idArticulo'] = $idArticuloKit[$i];
                    $datKit['cantidad'] = $cantidadKit[$i];
                    $kitrepo->create($datKit);

                }

            }


            DB::commit();
            return response()->json([
                'status' => true,
                'code' => $code
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function getAll(ProductInterface $repo)
    {
        return parseSelect($repo->all(), 'id', 'description');
    }

    public function traeAllTrans(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote', 'costo'];
        return parseList($repo->searchTrans($s), $request, 'id', $params);
    }

    public function getProductoPrecios(Request $request, Precios_productoInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['idProducto', 'Producto', 'Codigo_Articulo', 'Precio', 'Cliente', 'Moneda'];
        return parseList($repo->search($s), $request, 'idProducto', $params);
    }

    public function traeAll(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote', 'costo', 'impuesto', 'um_id'];
        return parseList($repo->search2($s), $request, 'id', $params);
    }

    public function traeAllMinKit(Request $request, ProductInterface $repo)
    {
        try {
            $s = $request->input('search', '');
            $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote', 'costo', 'um_id'];
            $info = parseDataList($repo->searchMinKit($s), $request, 'id', $params);

            $data = $info[1];

            foreach ($data as $d) {
                $u = $d->unity;
                $d->und = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
                unset($d->um_id, $d->unity);
            }
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

    public function traeAllSerie(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote'];
        return parseList($repo->searchSerie($s), $request, 'id', $params);
    }

    public function traeAll_Servicios(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote'];
        return parseList($repo->searchServicio($s), $request, 'id', $params);
    }

    public function traeAllLote(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote'];
        return parseList($repo->searchLote($s), $request, 'id', $params);
    }

    public function traeAll_kit(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description', 'code_article', 'type_id', 'serie', 'lote'];
        return parseList($repo->search3($s), $request, 'id', $params);
    }

    public function find($id, ProductInterface $repo)
    {
        try {

            $data = $repo->find($id);
            $precios_producto = $repo->get_precios($id);
            if ($data['type_id'] == 3) {
                $datosKit = $repo->getDetalleKit($id);
                $grupoKit = [];
                foreach ($datosKit as $bp) {
                    $grupoKit[] = [
                        'idArticuloKit' => $bp->idArticuloKit,
                        'idArticulo_kit' => $bp->idArticulo,
                        'code_kit' => $bp->code_article,
                        'idArticulo_kit_description' => $bp->description,
                        'cantidadkit' => $bp->cantidad,
                    ];
                }
                $data['GrupoKit'] = $grupoKit;
            }
            return response()->json([
                'status' => true,
                'data' => $data,
                'precios_producto' => $precios_producto,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function info($id, ProductInterface $repo)
    {
        try {
            $p = $repo->find($id);
            $level4 = $p->level;
            $level3 = $level4->parent;
            $level2 = $level3->parent;
            $level1 = $level2->parent;
            $data = [
                'matrix' => $p->code_matrix,
                'code' => $p->code_article,
                'description_detail' => $p->description_detail,
                'unity' => ($p->unity) ? $p->unity->Descripcion : '',
                'type' => $p->type->description,
                'retention' => ($p->retention) ? $p->retention->Descripcion : 'SIN RETENCIÓN',
                'level1' => $level1->code . '-' . $level1->description,
                'level2' => $level2->code . '-' . $level2->description,
                'level3' => $level3->code . '-' . $level3->description,
                'level4' => $level4->code . '-' . $level4->description,
                'cc_debe' => $p->cc_debe_id,
                'cc_haber' => $p->cc_haber_id,
                'created_d' => Carbon::parse($p->created_at)->format('d-m-Y'),
                'created_u' => $p->user_c->name,
                'updated_d' => Carbon::parse($p->updated_at)->format('d-m-Y'),
                'updated_u' => $p->user_u->name
            ];

            return response()->json([
                'status' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
//            throw new \Exception($e);
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy(ProductInterface $repo, Articulo_KitInterface $kitrepo, Request $request)
    {
        $id = $request->input('id');
        $data = $repo->find($id);
        if ($data['type_id'] == 3) {
            $info = $repo->getidArticuloKit($id);
            $idkit = $info[0]->idArticuloKit;
            $kitrepo->destroy($idkit);
        }
        $repo->destroy($id);
        return response()->json(['Result' => 'OK']);
    }

    public function data_form(TypeInterface $typeRepo, ModeloInterface $modeloRepo, CategoryInterface $categoriaRepo, BrandInterface $brandRepo, FamilyInterface $familyRepo, SubFamilyInterface $subfamilyRepo, HeadAccountanInterface $headRepo, MeasureInterface $unidad, ProductInterface $repo, CarroceriaInterface $car_repo)
    {
        $modelo = parseSelectOnly($modeloRepo->allActive(), 'idModelo', 'descripcion');
        $categoria = parseSelectOnly($categoriaRepo->allActive(), 'idCategoria', 'descripcion');
        $familia = parseSelectOnly($familyRepo->allActive(), 'idFamilia', 'descripcion');
        $subfamilia = parseSelectOnly($subfamilyRepo->allActive(), 'idSubFamilia', 'descripcion');
        $marca = parseSelectOnly($brandRepo->all(), 'id', 'description');
        $grupoContable = parseSelectOnly($headRepo->allActive(), 'idGrupoContableCabecera', 'descripcion');
        $unidadMedida = parseSelectOnly($unidad->allActive(), 'IdUnidadMedida', 'Descripcion');
        $types = parseSelectOnly($typeRepo->all(), 'id', 'description');
        $cateVehicular = $repo->getCategoriaVehicular();
        $carrocerias = $car_repo->getCarrocerias();
        return response()->json([
            'status' => true,
            'modelo' => $modelo,
            'categoria' => $categoria,
            'familia' => $familia,
            'subfamilia' => $subfamilia,
            'marca' => $marca,
            'grupocontable' => $grupoContable,
            'types' => $types,
            'unidadMedida' => $unidadMedida,
            'cateVehicular' => $cateVehicular,
            'carrocerias' => $carrocerias,
        ]);
    }

    // public function TraerModelos(ModeloInterface $modeloRepo){
    //       $modelo = parseSelectOnly($modeloRepo->allActive(), 'idModelo', 'descripcion');
    //         return response()->json([
    //             'status' => true,
    //             'data' => $data
    //         ]);
    // }

    public function getProductsSM(Request $request, ProductInterface $repo)
    {
        $s = $request->input('search', '');
        $params = ['id', 'description_detail'];
        $data = $repo->search($s)->whereNull('matrix');
        return parseList($data, $request, 'id', $params);
    }

    public function upload(Request $request)
    {
        if ($request->ajax()) {
            $imagePath = 'img/products/';

            $img = $request->input('img');
            $img = str_replace('data:image/jpeg;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);

            $name_unique = uniqid('prod_');
            $extension = 'jpg';

            $file = $imagePath . $name_unique . '.' . $extension;
            file_put_contents($file, $data);

            return response()->json([
                "status" => true,
                "url" => url('/') . '/' . $imagePath . $name_unique . '.' . $extension,
                "nameImg" => $name_unique . '.' . $extension
            ]);
        }
        throw new NotFoundHttpException();
    }

    public function excel(ProductInterface $repo)
    {
        return generateExcel($this->generateDataExcel($repo->all()), 'LISTA DE ARTICULOS', 'Artículos');
    }

    public function getArticles(Request $request, ProductInterface $repo, StockInterface $stockRepo)
    {
        $inputs = $request->all();

        $params = ['*'];

        $info = parseDataList($repo->search_detail($inputs), $request, 'id', $params);

        $data = $info[1];

        foreach ($data as $d) {
            $d->type_id = $d->type->description;
            if (isset($inputs['warehouse_id'])) {
                $stock = $stockRepo->findByWareHouseProduct($d->id, $inputs['warehouse_id']);
                $d->stock_p = (isset($stock)) ? $stock->stock : 0;
            }
            $d->matrix = (isset($d->level)) ? $d->level->description : '';
            unset($d->type, $d->level);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);
    }

    public function getArticlesWithWithoutProject(Request        $request, ProductInterface $repo,
                                                  StockInterface $stockRepo)
    {
        $inputs = $request->all();

        $params = ['*'];

        if (isset($inputs['project_id'])) {
            $info = parseDataList($repo->searchDetailProject($inputs), $request, 'id', $params);
        } else {
            $info = parseDataList($repo->search_detail($inputs), $request, 'id', $params);
        }

        $data = $info[1];

        foreach ($data as $d) {
            $u = $d->unity;
            $d->type_id = $d->type->description;
            $d->um = (is_null($u->symbol)) ? $u->Descripcion : $u->symbol;
            if (isset($inputs['warehouse_id'])) {
                $stock = $stockRepo->findByWareHouseProduct($d->id, $inputs['warehouse_id']);
                $d->stock_p = (isset($stock)) ? $stock->stock : '';
            }
            $d->matrix = (isset($d->level)) ? $d->level->description : '';
            unset($d->type, $d->level);
        }

        return response()->json([
            'Result' => 'OK',
            'TotalRecordCount' => $info[0],
            'Records' => $data
        ]);


    }

    public function obtener_precio(Request $request, ProductInterface $repo)
    {
        $precio = $repo->obtener_precio($request);
        return response()->json($precio);
    }
}
