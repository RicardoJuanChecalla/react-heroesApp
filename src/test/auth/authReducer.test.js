import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer',()=>{
    test('debe de retornar el estado por defecto', () => {
        const stateInitial = {logged: false};
        const state = authReducer(stateInitial,{});
        expect(state).toEqual(stateInitial);
    });
    test('debe de autenticar y colocar el "name" del usuario', () => {
        const action = {
          type: types.login,
          payload: {
              name: 'Ricardo'
          }
        }
        const state = authReducer({logged: false},action);
        expect(state).toEqual({
            logged: true, 
            name: 'Ricardo'});
    });
    test('debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
          }
          const state = authReducer({
            logged: true, 
            name: 'Ricardo'},action);
          expect(state).toEqual({
              logged: false});
    });
    
})