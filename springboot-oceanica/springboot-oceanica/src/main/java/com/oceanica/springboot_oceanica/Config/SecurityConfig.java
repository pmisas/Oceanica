package com.oceanica.springboot_oceanica.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() 
            .authorizeHttpRequests()
            .requestMatchers("/api/auth/**").permitAll()  // Permitir el acceso a /register
            .anyRequest().authenticated() // Cualquier otra ruta necesita autenticación
            .and()
            .httpBasic();  // Para autenticación básica (puedes cambiarlo si usas JWT u OAuth)

        return http.build();
    }

}
