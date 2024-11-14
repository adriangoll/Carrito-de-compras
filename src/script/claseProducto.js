export default class Producto{
    static items = JSON.parse(window.localStorage.getItem("productos"))||[]
    constructor(linkImagen, codigo, nombre, precio){
        this.linkImagen = linkImagen
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    };

    static getItem(){
        let productos = JSON.parse(window.localStorage.getItem("productos"));
        if (productos != undefined || productos != null){
            productos.forEach(element => {
                let item = new Producto(element.linkImagen, element.codigo, element.nombre, element.precio)
                this.items.push(item)
            });
        }
    }
    static renderDatabase(){
        window.localStorage.setItem('productos', JSON.stringify(this.items))
    }



    static crear(linkImg, codigo, nombre, precio){
        let nuevoProducto = new Producto(linkImg, codigo, nombre, precio)
        this.items.push(nuevoProducto)
        this.renderDatabase()
    };

    static allItems(){
        return this.items
    }

    static eliminar(producto){
        this.items.splice(producto, 1);
        console.log(this.items)
        this.renderDatabase()
    }

    static editar(index, producto){
        this.items[index] = producto
        this.renderDatabase()
    }
}