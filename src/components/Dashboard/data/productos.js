const columns = [
  { name: "ID", uid: "id" },
  { name: "NOMBRE", uid: "name" },
  { name: "MODELO", uid: "modelo" },
  { name: "MARCA", uid: "marca" },
  { name: "STOCK", uid: "stock" },
  // { name: "CATEGORIA", uid: "categoria  " },
  { name: "DESCRIPCION", uid: "descripcion" },
  // { name: "PRECIO", uid: "precio" },
  { name: "EDITAR PRODUCTOS", uid: "actions" },
];

const productos = [
  {
    id: "1",
    name: "Guantes",
    modelo: "Látex",
    marca: "NP 1",
    stock: 10,
    avatar:
      "https://http2.mlstatic.com/D_NQ_NP_791118-MLA53709570182_022023-O.webp",
    categoria: "Categoria 1",
    descripcion:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, suscipit? Hic consequuntur molestias doloribus vero quos!",
    precio: "300",
  },

  {
    id: "2",
    name: "Cubrebocas",
    modelo: "Face Mask",
    marca: "Tricapa Quirofano",
    stock: 20,
    avatar:
      "https://http2.mlstatic.com/D_NQ_NP_898032-MLA72491173896_102023-O.webp",
    categoria: "Categoria 2",
    descripcion:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, suscipit? Hic consequuntur molestias doloribus vero quos!",
    precio: "100",
  },
  {
    id: "3",
    name: "Gel antibacterial",
    modelo: "Ultra Clean",
    marca: "Algabo",
    stock: 30,
    avatar:
      "https://http2.mlstatic.com/D_NQ_NP_624911-MLU70611987750_072023-O.webp",
    categoria: "Categoria 3",
    descripcion:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, suscipit? Hic consequuntur molestias doloribus vero quos!",
    precio: "350",
  },
  {
    id: "4",
    name: "Bata quirúrgica",
    modelo: "Con puños para medico",
    marca: "Tutextil",
    stock: 42,
    avatar:
      "https://http2.mlstatic.com/D_NQ_NP_764253-MLA41329210384_042020-O.webp",
    categoria: "Categoria 3",
    descripcion:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, suscipit? Hic consequuntur molestias doloribus vero quos!",
    precio: "350",
  },
];

export { columns, productos };
