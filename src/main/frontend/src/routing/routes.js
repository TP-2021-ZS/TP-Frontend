export default {
  index: '/',
  login: '/login',
  registration: '/registration',
  dashboard: '/dashboard',
  accountsettings: '/accountsettings',
  addproject: '/addproject',
  allprojects: '/allprojects',
  editproject: {
    raw: '/editproject/:id',
    withId: (id) => ('/editproject/' + id)
  },
  help: 'help',
};
