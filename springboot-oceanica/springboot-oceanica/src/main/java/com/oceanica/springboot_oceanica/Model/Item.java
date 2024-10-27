package com.oceanica.springboot_oceanica.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
public class Item {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;


   @Positive(message = "El precio unitario debe ser mayor que 0")
   private int cantidad;

   @Positive(message = "El precio unitario debe ser mayor que 0")
   private double precio_unitario;


   @NotNull(message = "El producto no puede ser nulo")
    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;


   public Long getId() {
       return id;
   }

   public void setId(Long id) {
       this.id = id;
   }

   public int getCantidad() {
       return cantidad;
   }

   public void setCantidad(int cantidad) {
       this.cantidad = cantidad;
   }

   public double getPrecio_unitario() {
       return precio_unitario;
   }

   public void setPrecio_unitario(double precio_unitario) {
       this.precio_unitario = precio_unitario;
   }

   public Producto getProducto() {
        return producto;
   }

   public void setProducto(Producto producto) {
        this.producto = producto;
   }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Pedido getPedido() {
        return pedido;
    }


}
