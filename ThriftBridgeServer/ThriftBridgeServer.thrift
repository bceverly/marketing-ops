struct Product
{
  1: i32 id,
  2: string name,
  3: string notes,
}

service ProductService
{
  Product GetProductById(1: i32 id);
}