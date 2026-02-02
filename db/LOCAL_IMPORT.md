Local DB import instructions

1) Using a local MySQL server

   - Ensure MySQL server is running locally (default port 3306).
   - Create the database:

     mysql -u root -p -e "CREATE DATABASE hainesci_dental_db;"

   - Import the schema and sample data:

     mysql -u root -p hainesci_dental_db < db/schema_and_sample_inserts.sql

   - Update `.env.local` in project root to point to your local DB:

     HOSTGATOR_DB_HOST=127.0.0.1
     HOSTGATOR_DB_USER=root
     HOSTGATOR_DB_PASSWORD=your_local_root_password
     HOSTGATOR_DB_NAME=hainesci_dental_db
     HOSTGATOR_DB_PORT=3306

2) Using Docker (quick isolated MySQL)

   - Start a MySQL container and mount the SQL file:

     docker run --name local-mysql -e MYSQL_ROOT_PASSWORD=example -e MYSQL_DATABASE=hainesci_dental_db -p 3307:3306 -d mysql:8
     # wait a few seconds, then import
     docker exec -i local-mysql sh -c 'exec mysql -u root -p"example" hainesci_dental_db' < db/schema_and_sample_inserts.sql

   - Use `.env.local` with host `127.0.0.1` and port `3307`.
