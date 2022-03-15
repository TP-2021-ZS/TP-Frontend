import routes from './routes';

export default [
  {
    heading: 'Hlavná stránka',
    route: routes.index,
  },
  {
    heading: 'Prihlásenie',
    route: routes.login,
  },
  {
    heading: 'Registrácia',
    route: routes.registration,
  },
];
