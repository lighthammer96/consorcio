<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/3/2017
 * Time: 6:25 PM
 */

namespace App\Http\Recopro\Level;


interface LevelInterface
{
    public function search($s);

    public function find($id);

    public function getAll();

    public function getParents();

    public function getChildren($parent_id);

    public function searchChildren($s);

    public function searchChildrenAPU($s);

    public function searchChildrenGT($s, $type);
}