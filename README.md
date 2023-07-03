 ### Live Link: https://digital-cow-hut-backend-production.up.railway.app/
  ### Application Routes:

   #### User
   - api/v1/auth/signup (POST)
   - api/v1/users (GET)
   - api/v1/users/648f23980ccc4bc69c1e301b (Single GET) Include an id that is saved in your database
   - api/v1/users/648f23b60ccc4bc69c1e301e (PATCH)
   - api/v1/users/648f248f0ccc4bc69c1e302a (DELETE) Include an id that is saved in your database


   #### Cows
   - api/v1/cows/create-cow (POST)
   - api/v1/cows/ (GET)
   - api/v1/cows/648f39a52e516415fa3d8f0c (Single GET) Include an id that is saved in your database
   - api/v1/cows/648f39a52e516415fa3d8f0c (PATCH)
   - api/v1/cows/648f39a52e516415fa3d8f0c (DELETE) Include an id that is saved in your database

   ### Pagination and Filtering routes of Cows

   - api/v1/cows?pag=1&limit=10
   - api/v1/cows?sortBy=price&sortOrder=asc
   - api/v1/cows?minPrice=20000&maxPrice=70000
   - api/v1/cows?location=Chattogram
   - api/v1/cows?searchTerm=Cha
     
  
   #### Orders
   - api/v1/orders (POST)
   - api/v1/orders (GET)
