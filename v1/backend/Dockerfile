FROM php:8.4-fpm

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Base directory
WORKDIR /var/www

# Copy v1 contents (backend + frontend)
COPY . .

# 🔑 MOVE INTO LARAVEL ROOT (THIS WAS MISSING / MISPLACED)
WORKDIR /var/www/backend

# DEBUG (you can remove after success)
RUN pwd && ls -la composer.json

# Install dependencies (NOW composer.json EXISTS)
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data /var/www/backend \
    && chmod -R 775 storage bootstrap/cache

# ⚠ FIX TYPO FIRST: ngnix.conf → nginx.conf
COPY ./backend/docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD  CMD ["sh", "-c", "cd /var/www/backend && php artisan migrate --force && php artisan config:clear && php artisan config:cache && php artisan route:cache && php-fpm -D && nginx -g 'daemon off;'"]
# # cd /var/www/backend && \
#     php artisan migrate --force && \
#     php artisan config:clear && \
#     php artisan config:cache && \
#     php artisan route:cache && \
#     php-fpm -D && \
#     nginx -g 'daemon off;'
