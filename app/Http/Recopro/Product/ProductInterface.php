<?php
/**
 * Created by PhpStorm.
 * User: Ever
 * Date: 4/4/2017
 * Time: 10:44 PM
 */

namespace App\Http\Recopro\Product;


interface ProductInterface
{
    public function search($s);

    public function search_detail($s);

    public function searchDetailProject($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function findByAttr($attribute, $value);

    public function searchByMatrix($s);

    public function searchByMatrixAPU($s);

    public function searchByMatrixGT($s, $type);
}
