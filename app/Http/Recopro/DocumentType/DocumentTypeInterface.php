<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 19/07/2017
 * Time: 10:42 AM
 */

namespace App\Http\Recopro\DocumentType;


interface DocumentTypeInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}