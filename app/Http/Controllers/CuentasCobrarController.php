<?php

namespace App\Http\Controllers;

use App\Http\Recopro\Cobrador\CobradorInterface;

class CuentasCobrarController extends Controller
{
    public function data_form(CobradorInterface $repo)
    {
        try {
            $cobrador = $repo->getCobrador();
            $tienda = $repo->getTienda();
//            $cliente = $repo->getCliente();
//            $vendedores = $repo->getVendedor();
//            $categorias = $repo->getCategorias();
            return response()->json([
                'status' => true,
                'cobrador' => $cobrador,
                'tienda' => $tienda,
//                'cliente' => $cliente,
//                'usuarios' => $vendedores,
//                'vendedores' => $vendedores,
//                'categorias' => $categorias,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}