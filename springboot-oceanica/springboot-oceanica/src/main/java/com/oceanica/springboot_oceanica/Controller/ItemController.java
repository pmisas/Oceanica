package com.oceanica.springboot_oceanica.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oceanica.springboot_oceanica.Repository.ItemRepository;
import com.oceanica.springboot_oceanica.Repository.ProductoRepository;
import com.oceanica.springboot_oceanica.Model.Item;
import com.oceanica.springboot_oceanica.Model.Producto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/item")
public class ItemController {
    
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<?> createItem(@RequestBody Item item) {
        if (item.getProducto() != null && item.getProducto().getId() != null) {
            Optional<Producto> productoOpt = productoRepository.findById(item.getProducto().getId());
            
            if (productoOpt.isPresent()) {
                item.setProducto(productoOpt.get());
                Item nuevoItem = itemRepository.save(item);
                return ResponseEntity.ok(nuevoItem);
            } else {
                return ResponseEntity.status(404).body("Producto no encontrado");
            }
        } else {
            return ResponseEntity.status(400).body("ID del Producto es requerido");
        }
    }

    


}
