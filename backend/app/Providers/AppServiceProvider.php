<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Check if we're in a build/CLI environment without proper broadcast credentials
        if ($this->isBuildEnvironment()) {
            // Temporarily disable broadcasting to prevent errors during build
            config(['broadcasting.default' => 'null']);
            
            // Also disable broadcasting connections that might cause issues
            if (config('broadcasting.connections.reverb.key') === 'dummy_key' || 
                empty(config('broadcasting.connections.reverb.key'))) {
                config(['broadcasting.connections.reverb' => ['driver' => 'null']]);
            }
            
            if (config('broadcasting.connections.pusher.key') === 'dummy_key' || 
                empty(config('broadcasting.connections.pusher.key'))) {
                config(['broadcasting.connections.pusher' => ['driver' => 'null']]);
            }
        }
    }
    
    /**
     * Determine if we're in a build environment.
     */
    protected function isBuildEnvironment(): bool
    {
        // Check for Docker build environment or CLI operations
        return $this->app->environment('build') || 
               $this->app->runningInConsole() && (
                   env('PUSHER_APP_KEY') === 'dummy_key' ||
                   env('PUSHER_APP_KEY') === null ||
                   env('APP_ENV') === 'build'
               );
    }
}