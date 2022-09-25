<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 9:28 PM
 */

namespace App\Http\Recopro\Entity;

interface EntityInterface
{
    public function search($s);

    public function providers($s);

    public function clients($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function last();

    public function findByDocument($type, $document);
}