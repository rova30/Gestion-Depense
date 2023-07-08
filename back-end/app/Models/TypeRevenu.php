<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeRevenu
 *
 * @property int $id
 * @property string $nom
 *
 * @property Collection|Revenu[] $revenus
 *
 * @package App\Models
 */
class TypeRevenu extends Model
{
	protected $table = 'typerevenus';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function revenus()
	{
		return $this->hasMany(Revenu::class);
	}
}
