package com.web.demo.repository;

import java.util.List;

import com.web.demo.model.Modelo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ModeloRepository extends JpaRepository<Modelo, Long> {
    
    List<Modelo> findByNomeContaining(String nome);
}