FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy only necessary files for composer install (improves caching)
COPY composer.json composer.lock ./
COPY artisan ./
COPY config ./config

# Set dummy environment variables for build time only
ENV PUSHER_APP_KEY=dummy_key
ENV PUSHER_APP_SECRET=dummy_secret
ENV PUSHER_APP_ID=dummy_id
ENV REVERB_APP_ID=dummy_app_id
ENV REVERB_APP_KEY=dummy_app_key
ENV REVERB_APP_SECRET=dummy_app_secret
ENV APP_ENV=build

# Create dummy .env file for Laravel
RUN echo "APP_ENV=build" > .env && \
    echo "PUSHER_APP_KEY=dummy_key" >> .env && \
    echo "PUSHER_APP_SECRET=dummy_secret" >> .env && \
    echo "PUSHER_APP_ID=dummy_id" >> .env && \
    echo "REVERB_APP_ID=dummy_app_id" >> .env && \
    echo "REVERB_APP_KEY=dummy_app_key" >> .env && \
    echo "REVERB_APP_SECRET=dummy_app_secret" >> .env

# Install dependencies (disable plugins to avoid root warnings)
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the application
COPY . .

# Clear config cache to ensure runtime config works
RUN php artisan config:clear

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000