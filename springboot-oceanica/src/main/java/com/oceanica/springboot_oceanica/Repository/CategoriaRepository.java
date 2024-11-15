package com.oceanica.springboot_oceanica.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.oceanica.springboot_oceanica.Model.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

    Optional<Categoria> findByNombre(String nombre);

}
