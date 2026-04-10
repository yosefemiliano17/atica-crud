Crud de Productos desarrollado en nestjs, reactjs y postgresql

<img width="1192" height="326" alt="image" src="https://github.com/user-attachments/assets/13ac6184-6e50-40bf-bea5-b009a4554d67" />
<img width="1215" height="818" alt="image" src="https://github.com/user-attachments/assets/6cb5f7d8-9f25-40bd-bc52-282581d39771" />
<img width="1215" height="818" alt="image" src="https://github.com/user-attachments/assets/a550ca66-f6bb-453b-bae3-3557617ab5b6" />
<img width="1215" height="818" alt="image" src="https://github.com/user-attachments/assets/9097d864-ccab-407e-87f1-54212531987f" />

## Instrucciones para ejecucion local

renombrar el archivo .env.example a .env

Iniciar el contenedor de docker para postgresql con el siguiente comando: 

```bash
  docker-compose up -d
```

Para correr localmente el backend ejecutar los siguientes comandos: 

```bash
  cd ./backend
  npm install
  npx prisma generate
  npx prisma migrate dev
  npx prisma db seed
  npm run start:dev
```

Para correr localmente el frontend ejecutar los siguintes comandos: 


```bash
  cd ./frontend
  npm install
  npm run dev
```

## Esquema de la base de datos: 

```sql
  CREATE TABLE "products" (
      "id" SERIAL NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "price" DECIMAL(65,30) NOT NULL,
      "stock" INTEGER NOT NULL DEFAULT 0,
      "sku" TEXT NOT NULL,
      "removed" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
  
      CONSTRAINT "products_pkey" PRIMARY KEY ("id")
  );
  
  CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");
```


## Endpoints

GET /products?name= -> Regresa todos los productos que contengan name en su nombre, en caso contrario regresara todo el listado de productos

POST /products -> Creara un nuevo producto

PUT /products:id -> Actualizara el producto con el id seleccionado

DELETE /products:id -> Hara un borrado logico del producto con el id seleccionado








