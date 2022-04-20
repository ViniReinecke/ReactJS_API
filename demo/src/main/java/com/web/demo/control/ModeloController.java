package com.web.demo.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.demo.model.Modelo;
import com.web.demo.repository.ModeloRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class ModeloController {
    
    @Autowired
    ModeloRepository funcRep;
  
    // POST /api/modelos -> criar modelo
    @PostMapping("/modelos")
    public ResponseEntity<Modelo> createModelo(@RequestBody Modelo modelo) {
      try {
        Modelo _produto = funcRep.save(new Modelo(modelo.getNome(), modelo.getPreco()));
        return new ResponseEntity<>(_produto, HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // GET /api/modelos -> listar todos os modelos
    @GetMapping("/modelos")
    public ResponseEntity<List<Modelo>> getAllModelos(@RequestParam(required = false) String nome) {
      try {
        List<Modelo> lf = new ArrayList<Modelo>();
        if(nome==null)
          funcRep.findAll().forEach(lf::add);
        else
        funcRep.findByNomeContaining(nome).forEach(lf::add);
  
        if (lf.isEmpty()) 
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        
  
        return new ResponseEntity<>(lf, HttpStatus.OK);
  
      } catch (Exception e) {
        
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // DEL /api/modelos/:id -> remover modelo dado um id
    @DeleteMapping("/modelos/{id}")
    public ResponseEntity<HttpStatus> deleteModelo(@PathVariable("id") long id) {
      try {
        funcRep.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // DEL /api/modelos -> remover todos os modelos
    @DeleteMapping("/modelos")
    public ResponseEntity<HttpStatus> deleteAllModelo() {
      try {
        funcRep.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
      } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}