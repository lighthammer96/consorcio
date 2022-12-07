<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:56 PM
 */

namespace App\Http\Recopro\Solicitud_cierre;


interface Solicitud_cierreInterface
{
    public function search($s, $periodo);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}