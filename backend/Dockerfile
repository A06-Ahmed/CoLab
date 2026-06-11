FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy everything first
COPY . .

# Set dummy environment variables for build time only
ENV APP_ENV=build
ENV BROADCAST_CONNECTION=null
ENV PUSHER_APP_KEY=dummy_key
ENV PUSHER_APP_SECRET=dummy_secret
ENV PUSHER_APP_ID=dummy_id
ENV REVERB_APP_KEY=dummy_key
ENV REVERB_APP_SECRET=dummy_secret
ENV REVERB_APP_ID=dummy_id
ENV REVERB_HOST=localhost
ENV REVERB_PORT=8080
ENV REVERB_SCHEME=http

# Create dummy .env file
RUN echo "APP_ENV=build" > .env && \
    echo "BROADCAST_CONNECTION=null" >> .env && \
    echo "PUSHER_APP_KEY=dummy_key" >> .env && \
    echo "PUSHER_APP_SECRET=dummy_secret" >> .env && \
    echo "PUSHER_APP_ID=dummy_id" >> .env && \
    echo "REVERB_APP_KEY=dummy_key" >> .env && \
    echo "REVERB_APP_SECRET=dummy_secret" >> .env && \
    echo "REVERB_APP_ID=dummy_id" >> .env

# Remove problematic symlink if it exists
RUN rm -f public/storage || true

# Run composer install
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Recreate the storage symlink after copying
RUN php artisan storage:link || true

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache || true
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache || true

# Clear config cache
RUN php artisan config:clear || true

EXPOSE 8080

CMD ["sh", "-c", "php artisan serve --host=0.0.0.0 --port=${PORT:-8080}"]