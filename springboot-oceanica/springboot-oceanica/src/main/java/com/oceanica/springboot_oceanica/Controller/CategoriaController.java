package com.oceanica.springboot_oceanica.Controller;


import com.oceanica.springboot_oceanica.Model.Categoria;
import com.oceanica.springboot_oceanica.Model.Producto;
import com.oceanica.springboot_oceanica.Repository.CategoriaRepository;

import jakarta.websocket.server.PathParam;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/categoria")
public class CategoriaController {
    
    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<?> createCategoria(@RequestBody Categoria categoria) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findByNombre(categoria.getNombre());
        
        if (categoriaExistente.isPresent()) {
            return ResponseEntity.status(409).body("La categoría ya existe.");
        }
        Categoria nuevaCategoria = categoriaRepository.save(categoria);
        return ResponseEntity.ok(nuevaCategoria);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);

        if (categoria.isPresent()){
            categoriaRepository.delete(categoria.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
