/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Home/Home.js').default);
        });
      }}
    />
    <Route
      path="/articulos"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Articulos/Articulos.js').default);
        });
      }}
    />
    <Route
      path="/clientes"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Clientes/Clientes.js').default);
        });
      }}
    />
    <Route
      path="/ventas"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Ventas/Ventas.js').default);
        });
      }}
    />
    <Route
      path="/ventas/registrosventas"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Registrosventas/Registrosventas.js').default);
        });
      }}
    />
    <Route
      path="/configuracion"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Lavendimia/components/Configuracion/Configuracion.js').default);
        });
      }}
    />
  </Route>
);
