<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {return ['laravel' => app()->version()];});


Route::get('/health', function () {
    return response()->json([
        'status' => 'ok'
    ]);
});
