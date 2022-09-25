<?php
/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 21/06/2017
 * Time: 10:40 PM
 */

namespace App\Http\Recopro\EntryProduct;


interface EntryProductInterface
{
    public function deleteByEntry($entry_id, array $ids);

    public function createUpdate(array $data);

    public function deleteByEntryAll($id);

    public function findByEntry($entry_id, $ids);

}