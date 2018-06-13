import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './EmployeeActionCreator';
import * as types from './EmployeeActionTypes';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('synchronous actions', () => {
  it('list should send objects', () => {
    expect(actions.list(['p1', 'p2'])).toEqual({
      type : types.LIST,
      employees : ['p1', 'p2'],
    })
  });

  it ('get should send object', () => {
    expect(actions.get('p1')).toEqual({
      type : types.GET,
      employee : 'p1',
    })
  })
});

describe('asynchronous actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it ('creates LIST when fetching employees is done', () => {
    moxios.stubRequest('/api/users', {
      status : 200,
      response : ['employee1', 'employee2'],
    });

    const expectedActions = [
      { type : types.LIST, employees : ['employee1', 'employee2'] }
    ];
    const store = mockStore({ employees : [] });

    return store.dispatch(actions.listEmployees()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it ('creates GET when fetching a single employee', () => {
    moxios.stubRequest('/api/users/1', {
      status : 200,
      response : 'employee1',
    });

    const expectedActions = [
      { type : types.GET, employee : 'employee1' }
    ];
    const store = mockStore({ employees : [] });

    return store.dispatch(actions.getEmployee(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it ('creates GET when updating an employee', () => {
    moxios.stubRequest('/api/users/1', {
      status : 200,
      response : 'employee1',
    });

    const expectedActions = [
      { type : types.GET, employee : 'employee1' }
    ];
    const store = mockStore({ employees : [] });

    return store.dispatch(actions.removeEmployee({ _id : 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it ('creates GET when removing an employee', () => {
    moxios.stubRequest('/api/users/1', {
      status : 200,
      response : 'employee1',
    });

    const expectedActions = [
      { type : types.GET, employee : 'employee1' }
    ];
    const store = mockStore({ employees : [] });

    return store.dispatch(actions.updateEmployee({ _id : 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it ('creates GET when restoring an employee', () => {
    moxios.stubRequest('/api/users/1', {
      status : 200,
      response : 'employee1',
    });

    const expectedActions = [
      { type : types.GET, employee : 'employee1' }
    ];
    const store = mockStore({ employees : [] });

    return store.dispatch(actions.restoreEmployee({ _id : 1 })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

})
