package com.web.demo.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



    @Entity
@Table(name = "modelo")
public class Modelo {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column
  private String nome;

  @Column
  private String preco;

  public Modelo() {

  }

  public Modelo(String nome, String preco) {
    this.nome = nome;
    this.preco = preco;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getNome(){
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getPreco() {
    return preco;
  }

  public void setPreco(String preco) {
    this.preco = preco;
  }

  @Override
  public String toString() {
    return "Modelo [id = " + id + ", nome = " + nome + ", preço = " + preco + "]";
  }
}
    

