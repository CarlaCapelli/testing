export class Product {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
  
    constructor(id: string, nombre: string, precio: number, stock: number) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
    }
  }
  