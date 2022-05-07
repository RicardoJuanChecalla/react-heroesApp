import { LoginScreen } from "../../../components/login/LoginScreen";
import { mount } from 'enzyme';
import { AuthContext } from "../../../auth/authContext";
import { MemoryRouter } from "react-router-dom";
import { types } from "../../../types/types";
const mockNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))
describe('Pruebas en el <LoginScreen />', () => {
    const contextValue = {
        stateUser: {
            logged: false
        },
        dispatch: jest.fn()
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    );
  test('Debe de mostrar correctamente', () => {

    expect(wrapper).toMatchSnapshot();
  });  
  test('Debe de realizar el dispach y la navegación', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({payload: { name: "Ricardo Checalla"},type: types.login});
    expect(mockNavigate).toHaveBeenCalledWith('/marvel', {replace: true});
    localStorage.setItem('lastPath','/dc');
    handleClick();
    expect(mockNavigate).toHaveBeenCalledWith('/dc', {replace: true});
  });
});
