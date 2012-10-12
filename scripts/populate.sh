# drop the databases

mongo scripts/drop.js

# populate

find domain/chefs -type f -exec curl -X POST -d @{} -H 'Content-Type: application/json' http://localhost:3000/api/food/chefs \;
find domain/recipes -type f -exec curl -X POST -d @{} -H 'Content-Type: application/json' http://localhost:3000/api/food/recipes \;
find domain/books -type f -exec curl -X POST -d @{} -H 'Content-Type: application/json' http://localhost:3000/api/food/books \;
find domain/ingredients -type f -exec curl -X POST -d @{} -H 'Content-Type: application/json' http://localhost:3000/api/food/ingredients \;

