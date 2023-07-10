<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Token
 *
 * @property int $id
 * @property string $token
 * @property int $membre_id
 * @property Carbon $date_expiration
 * @property boolean $statut

 * @property Collection|Membre[] $membres
 *
 * @package App\Models
 */
class Token extends Model
{
    protected $table = 'tokens';
    public $timestamps = false;

    protected $casts = [
        'membre_id' => 'int',
        'date_expiration' => 'date',
        'statut' => 'boolean'
    ];


    protected $fillable = [
        'token',
        'membre_id',
        'date_expiration',
        'statut'
    ];

    public function membre()
    {
        return $this->belongsTo(Membre::class);
    }
}
