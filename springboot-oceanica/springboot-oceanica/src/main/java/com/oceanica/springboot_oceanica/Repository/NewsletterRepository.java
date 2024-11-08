package com.oceanica.springboot_oceanica.Repository;

import com.oceanica.springboot_oceanica.Model.Newsletter;
import org.springframework.data.jpa.repository.JpaRepository;


import com.oceanica.springboot_oceanica.Model.Newsletter;

public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
}
