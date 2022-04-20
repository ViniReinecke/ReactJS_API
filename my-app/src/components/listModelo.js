import React, { Component } from "react";
import ModeloDataService from "../services/modeloDataService";
import { Link } from "react-router-dom";


export default class ListModelo extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveModelos = this.retrieveModelos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setModeloSel = this.setModeloSel.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      modelos: [],
      modeloSel: null,
      indice: -1,
      nome: ""
    };
  }

  componentDidMount() {
    this.retrieveModelos();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      nome: searchNome
    });
  }

  retrieveModelos() {
    ModeloDataService.getAll()
      .then(response => {
        this.setState({
          modelos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveModelos();
    this.setState({
      modeloSel: null,
      indice: -1
    });
  }

  setModeloSel(modelo, index) {
    this.setState({
      modeloSel: modelo,
      indice: index
    });
  }

  removeAll() {
    ModeloDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    this.setState({
      modeloSel: null,
      indice: -1
    });

    ModeloDataService.findByNome(this.state.nome)
      .then(response => {
        this.setState({
          modelos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { nome, modelos, modeloSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          {/* <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome do modelo"
              value={nome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Buscar
              </button>
            </div>
          </div> */}
        </div>
        <div className="col-md-6">
          <h4>Modelos</h4>

          <ul className="list-group">
            {modelos &&
              modelos.map((modelo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setModeloSel(modelo, index)}
                  key={index}
                >
                  {modelo.nome}
                </li>
              ))}
          </ul>

          <center><button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button></center>
        </div>
        <div className="col-md-6">
          {modeloSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Modelo:</strong>
                </label>{" "}
                {modeloSel.nome}
              </div>
              <div>
                <label>
                  <strong>Preço(R$):</strong>
                </label>{" "}
                {modeloSel.preco}
              </div>
              {/* <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {produtoSel.publicado ? "Publicado" : "Pendente"}
              </div> */}

              {/* <Link
                to={"/list/" + produtoSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link> */}
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um modelo.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}