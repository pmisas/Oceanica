package com.oceanica.springboot_oceanica.Controller;

import com.oceanica.springboot_oceanica.Model.Categoria;
import com.oceanica.springboot_oceanica.Model.Producto;
import com.oceanica.springboot_oceanica.Repository.CategoriaRepository;
import com.oceanica.springboot_oceanica.Repository.ProductoRepository;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/productos")
@Validated
public class ProductoController {

    private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Value("${image.upload.dir}")
    private String imageUploadDir;

    @GetMapping("/public")
    public List<Producto> getAllProductos() {
        logger.info("Fetching all products");
        return productoRepository.findAll();
    }

    @GetMapping("/{categoria}/public")
    public List<Producto> getProductosByCategoria(@PathVariable String categoria) {
        logger.info("Fetching products by category: {}", categoria);
        return productoRepository.findByCategorias_Nombre(categoria);
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
    
    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<Map<String, String>> uploadImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        Optional<Producto> productoOpt = productoRepository.findById(id);

        if (!productoOpt.isPresent()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Producto no encontrado");
            return ResponseEntity.status(404).body(errorResponse);
        }

        Producto producto = productoOpt.get();

        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(imageUploadDir, fileName);

            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath);

            producto.setImage(fileName);
            productoRepository.save(producto);

            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Imagen subida exitosamente");
            successResponse.put("fileName", fileName); // Puedes incluir el nombre del archivo si lo necesitas en el frontend

            return ResponseEntity.ok(successResponse);

        } catch (IOException e) {
            logger.error("Error al guardar la imagen en el sistema de archivos", e);

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al guardar la imagen");

            return ResponseEntity.status(500).body(errorResponse);
        }
    }


    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) {
        Optional<Producto> productoOpt = productoRepository.findById(id);

        if (!productoOpt.isPresent()) {
            return ResponseEntity.status(404).body(null);
        }

        Producto producto = productoOpt.get();
        if (producto.getImage() == null) {
            return ResponseEntity.status(404).body(null);
        }

        Path imagePath = Paths.get(imageUploadDir, producto.getImage());

        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            logger.info(imagePath.getFileName().toString());
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imagePath.getFileName().toString() + "\"")
                    .body(imageBytes);

        } catch (IOException e) {
            logger.error("Error al leer la imagen desde el sistema de archivos", e);
            return ResponseEntity.status(500).body(null);
        }
    }



    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProducto(@PathVariable Long id, @Valid @RequestBody Producto productoDetails) {
        Optional<Producto> productoOpt = productoRepository.findById(id);

        if (productoOpt.isPresent()) {
            Producto productoActualizado = productoOpt.get();

            productoActualizado.setNombre(productoDetails.getNombre());
            productoActualizado.setPrecio(productoDetails.getPrecio());
            productoActualizado.setStock(productoDetails.getStock());
            productoActualizado.setDescripcion(productoDetails.getDescripcion());

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
