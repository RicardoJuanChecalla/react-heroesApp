import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  Navigate: ()=> <span>Saliendo de aqui</span>
}))

describe('Pruebas en <PrivateRoute />', () => { 
    Storage.prototype.setItem = jest.fn();
    test('Debe de mostrarel componente si está autenticado y guardar el localstorage', () => { 
        const contextValue = {
            stateUser: {
                logged: true,
                name: 'Ricardo'
            },
            dispatch: jest.fn()
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text().trim()).toBe('Private Component');
        expect(localStorage.setItem).toHaveBeenCalledWith( 'lastPath', '/');
     });
     test('Debe de bloquear el componente si no está autenticado', () => { 
        const contextValue = {
            stateUser: {
                logged: false
            },
            dispatch: jest.fn()
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper.text().trim()).toBe('Saliendo de aqui');
      });
 })