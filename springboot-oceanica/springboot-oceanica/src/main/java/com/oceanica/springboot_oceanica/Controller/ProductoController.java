package com.oceanica.springboot_oceanica.Controller;
import com.oceanica.springboot_oceanica.Model.Categoria;
import com.oceanica.springboot_oceanica.Model.Producto;
import com.oceanica.springboot_oceanica.Repository.CategoriaRepository;
import com.oceanica.springboot_oceanica.Repository.ProductoRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/productos")
@Validated
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/public")
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createProducto(@Valid @RequestBody Producto producto) {
        if (producto.getCategorias() == null || producto.getCategorias().isEmpty()) {
            return ResponseEntity.status(400).body("Debe agregar al menos una categoría.");
        }

        Set<Categoria> categoriasValidas = new HashSet<>();
        for (Categoria categoria : producto.getCategorias()) {
            Optional<Categoria> categoriaOpt = categoriaRepository.findByNombre(categoria.getNombre());
            if (categoriaOpt.isPresent()) {
                categoriasValidas.add(categoriaOpt.get());
            } else {
                return ResponseEntity.status(404).body("Categoría no encontrada: " + categoria.getNombre());
            }
        }

        producto.setCategorias(categoriasValidas);
        Producto nuevoProducto = productoRepository.save(producto);
        return ResponseEntity.ok(nuevoProducto);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProducto(@PathVariable Long id,@Valid @RequestBody Producto productoDetails) {
        Optional<Producto> productoOpt = productoRepository.findById(id);

        if (productoOpt.isPresent()) {
            Producto productoActualizado = productoOpt.get();

            productoActualizado.setNombre(productoDetails.getNombre());
            productoActualizado.setPrecio(productoDetails.getPrecio());
            productoActualizado.setStock(productoDetails.getStock());
            productoActualizado.setDescripcion(productoDetails.getDescripcion());
            productoActualizado.setImage(productoDetails.getImage());

            if (productoDetails.getCategorias() != null && !productoDetails.getCategorias().isEmpty()) {
                Set<Categoria> categoriasValidas = new HashSet<>();
                for (Categoria categoria : productoDetails.getCategorias()) {
                    Optional<Categoria> categoriaOpt = categoriaRepository.findByNombre(categoria.getNombre());
                    if (categoriaOpt.isPresent()) {
                        categoriasValidas.add(categoriaOpt.get());
                    } else {
                        return ResponseEntity.status(404).body("Categoría no encontrada: " + categoria.getNombre());
                    }
                }
                productoActualizado.setCategorias(categoriasValidas);
            }
        
            productoRepository.save(productoActualizado);
            return ResponseEntity.ok(productoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            productoRepository.delete(producto.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}