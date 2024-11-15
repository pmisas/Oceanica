package com.oceanica.springboot_oceanica.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oceanica.springboot_oceanica.Model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
    
}
