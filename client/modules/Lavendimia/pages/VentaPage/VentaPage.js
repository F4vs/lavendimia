import React, { PropTypes, Component } from 'react';
import { FormGroup, ControlLabel, Form, Col, ButtonToolbar, Button, Table } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import { getClientes, getArticulos } from '../../LavendimiaReducer';
import { connect } from 'react-redux';
import { fetchClientes, fetchArticulos } from '../../LavendimiaActions';

const getSuggestionValue = suggestion => suggestion.nombre + ' ' + suggestion.primerapellido + ' ' + suggestion.segundoapellido;
const getSuggestionValueArticulo = suggestion => suggestion.descripcion;

const renderSuggestion = cliente => (
  <div>
    {cliente.nombre} {cliente.primerapellido} {cliente.segundoapellido}
  </div>
);

const renderSuggestionArticulo = articulo => (
  <div>
    {articulo.descripcion}
  </div>
);

class VentaPage extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      valueArticulo: '',
      clientes: [],
      articulos: [],
    }; }

  componentDidMount() {
    this.props.dispatch(fetchClientes());
    this.props.dispatch(fetchArticulos());
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      clientes: this.getSuggestions(value),
    });
  };

  onSuggestionsFetchRequestedArticulo = ({ valueArticulo }) => {
    this.setState({
      articulos: this.getSuggestionsArticulo(valueArticulo),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      clientes: [],
    });
  };

  onSuggestionsClearRequestedArticulo = () => {
    this.setState({
      articulos: [],
    });
  };

  getSuggestions = (value) => {
    const data = this.props.clientes;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : data.filter(cliente =>
      cliente.nombre.toLowerCase().slice(0, inputLength) === inputValue ||
      cliente.primerapellido.toLowerCase().slice(0, inputLength) === inputValue ||
      cliente.segundoapellido.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionsArticulo = (valueArticulo) => {
    const data = this.props.articulos;
    const inputValue = valueArticulo.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : data.filter(articulo =>
      articulo.descripcion.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  render() {
    const { value, clientes, valueArticulo, articulos } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Nombre del cliente',
      value,
      onChange: this.onChange,
    };

    const inputArticuloProps = {
      placeholder: 'Descripcion del articulo',
      valueArticulo,
      onChange: this.onChange,
    };

    return (
      <div>
        <h2>Registros de Ventas</h2>
        <Form horizontal>
          <FormGroup controlId="">
            <Col componentClass={ControlLabel} sm={3}>
              Cliente
            </Col>
            <Col sm={4}>
              <Autosuggest
                suggestions={clientes}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="">
            <Col componentClass={ControlLabel} sm={3}>
              Articulo
            </Col>
            <Col sm={6}>
              <Autosuggest
                suggestions={articulos}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequestedArticulo}
                onSuggestionsClearRequested={this.onSuggestionsClearRequestedArticulo}
                getSuggestionValue={getSuggestionValueArticulo}
                renderSuggestion={renderSuggestionArticulo}
                inputProps={inputArticuloProps}
              />
            </Col>
          </FormGroup>
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">Agregar</Button>
          </ButtonToolbar>
        </Form>
        <br />
        <Table striped condensed hover>
          <thead>
            <tr>
              <th>Descripcion del Articulo</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Comedor de roble para 6 perosonas</td>
              <td>2</td>
              <td>$5,000</td>
              <td>$6,000</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientes: getClientes(state),
    articulos: getArticulos(state),
  };
}

VentaPage.propTypes = {
  clientes: PropTypes.array,
  articulos: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(VentaPage);
