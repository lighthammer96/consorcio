<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 10/07/2017
 * Time: 04:28 PM
 */

namespace App\Http\Controllers;


use App\Http\Recopro\Departure\Departure;
use App\Http\Recopro\DepartureProduct\DepartureProduct;
use App\Http\Recopro\Entry\Entry;
use App\Http\Recopro\EntryProduct\EntryProduct;
use App\Http\Recopro\Stock\Stock;
use App\Http\Recopro\Transfer\Transfer;
use App\Http\Recopro\TransferDetail\TransferDetail;
use App\Http\Recopro\TransferProduct\TransferProduct;

class ResetController extends Controller
{
    public function index()
    {
        TransferProduct::truncate();
        TransferDetail::truncate();
        Transfer::truncate();
        Stock::truncate();
        EntryProduct::truncate();
        DepartureProduct::truncate();
        Entry::truncate();
        Departure::truncate();

        return 'OK';
    }
}