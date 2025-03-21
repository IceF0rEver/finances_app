<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SankeyData extends Model
{
    use HasFactory;

    protected $fillable = ['from', 'to', 'amount', 'type', 'parent_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parent()
    {
        return $this->belongsTo(SankeyData::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(SankeyData::class, 'parent_id');
    }
}
