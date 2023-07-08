<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sexe
 *
 * @property int $id
 * @property string $nom
 *
 * @property Collection|Membre[] $membres
 *
 * @package App\Models
 */
class Sexe extends Model
{
    protected $table = 'sexes';
    public $timestamps = false;

    protected $fillable = [
        'nom'
    ];

    public function membres()
    {
        return $this->hasMany(Membre::class);
    }
}
