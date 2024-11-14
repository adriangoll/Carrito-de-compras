export default class ProductoCarrito {
    static itemsCarrito = []; 

    static {
        let productos = JSON.parse(localStorage.getItem("carrito"));
        if (productos)
            productos.forEach(element => {
                let item = new ProductoCarrito(element.producto, element.cantidad)
                this.itemsCarrito.push(item);
            });
    }

    constructor(producto, cantidad = 1) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.subtotal = this.producto.precio * this.cantidad;
    }

    static agregar(producto) {
        let productoExistente = this.itemsCarrito.find(item => item.producto.codigo === producto.codigo);
        if (productoExistente) {
            this.actualizarCantidad(producto.codigo, 1)
        } else {
        let productoAgregar = new ProductoCarrito(producto);
        this.itemsCarrito.push(productoAgregar);
        this.renderCarrito();
    }
}

    static actualizarCantidad(codigo, cantidad) {
        //Identificamos el producto
        let producto = this.itemsCarrito.find(item => item.producto.codigo === parseInt(codigo));
        if (producto) {
            producto.cantidad += cantidad;
            
            if (producto.cantidad <= 0) {
                // Eliminar el producto si la cantidad es 0 o menos
                this.itemsCarrito = this.itemsCarrito.filter(item => item.producto.codigo !== parseInt(codigo));
            } else {
                // Actualizar el subtotal si sigue en el carrito
                producto.subtotal = producto.producto.precio * producto.cantidad;
            }

            this.renderCarrito();
        }
    }
    //Eliminamos usando el boton eliminar
    static removeProduct(producto){
        this.itemsCarrito.splice(producto, 1);
        alert("Eliminando producto")
        this.renderCarrito()
    }

    //Actualizamos la base de datos
    static renderCarrito() {
        localStorage.setItem("carrito", JSON.stringify(this.itemsCarrito));
    }
}
