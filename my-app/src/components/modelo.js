import React, { Component } from "react";
import ModeloDataService from "../services/modeloDataService";

import { useParams } from 'react-router-dom';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

class Modelo extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.getModelo = this.getModelo.bind(this);
    this.updatePublicado = this.updatePublicado.bind(this);
    this.updateModelo = this.updateModelo.bind(this);
    this.deleteModelo = this.deleteModelo.bind(this);

    this.state = {
      modeloAtual: {
        id: null,
        nome: "",
        preco: "",
        publicado: false
      },
      mensagem: ""
    };
  }
  
  componentDidMount() {

    this.getModelo(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        modeloAtual: {
          ...prevState.modeloAtual,
          nome: nome
        }
      };
    });
  }

  onChangePreco(e) {
    const preco = e.target.value;
    
    this.setState(prevState => ({
      modeloAtual: {
        ...prevState.modeloAtual,
        preco: preco
      }
    }));
  }

  getModelo(id) {
    ModeloDataService.get(id)
      .then(response => {
        this.setState({
          modeloAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }

  updatePublicado(status) {
    var data = {
      id: this.state.modeloAtual.id,
      nome: this.state.modeloAtual.nome,
      preco: this.state.modeloAtual.preco,
      publicado: status
    };

    ModeloDataService.update(this.state.modeloAtual.id, data)
      .then(response => {
        this.setState(prevState => ({
          modeloAtual: {
            ...prevState.modeloAtual,
            publicado: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateModelo() {
    ModeloDataService.update(
      this.state.modeloAtual.id,
      this.state.modeloAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          mensagem: "Modelo atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteModelo() {    
    ModeloDataService.delete(this.state.modeloAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { modeloAtual } = this.state;

    return (
      <div>
        {modeloAtual ? (
          <div className="edit-form">
            <h4>Modelo</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Título</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={modeloAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preco"><strong>Preço</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="preco"
                  value={modeloAtual.preco}
                  onChange={this.onChangePreco}
                />
              </div>

              {/* <div className="form-group">
                <br />
                <label>
                  <strong>Status:</strong>
                </label>
                    <b>
                    {produtoAtual.publicado ? " publicado" : " não publicado"}
                    </b>
              </div> */}
            </form>
            

            {/* {produtoAtual.publicado ? (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublicado(false)}
              >
                Alterar status
              </button>
            ) : (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updatePublicado(true)}
              >
                Alterar status
              </button>
            )} */}

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteModelo}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateModelo}
            >
              Atualizar
            </button>
            <p>{this.state.mensagem}</p>
          </div>
        ) : (
          <div>
            <br />
            <p><i>Para detalhes, selecionar um modelo.</i></p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Modelo);