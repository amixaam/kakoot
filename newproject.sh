# This script runs the neccessary commands to setup the project when cloning it from the repo
# Run from the project root

cp .env.example .env

composer install
npm install

php artisan key:generate
php artisan migrate:fresh --seed

echo "Done! You can now run 'composer run dev' to start developing."
echo "Make sure to change the values in .env to your own."