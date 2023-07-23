<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function getAllTransactionByFamilleId($famille_id) {
        $data = DB::select("SELECT * FROM v_transactions WHERE famille_id = ? ORDER BY date_transaction DESC",[$famille_id]);
        return response()->json(['transactions' => $data], 200);
    }
    public function getAllTransactionByMembreId($famille_id, $membre_id) {
        $data = DB::select("SELECT * FROM v_transactions WHERE famille_id = ? AND membre_id = ? ORDER BY date_transaction DESC",[$famille_id, $membre_id]);
        return response()->json(['mytransactions' => $data], 200);
    }
}
