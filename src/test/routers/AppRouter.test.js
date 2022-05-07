import { AppRouter } from "../../routers/AppRouter";
import { mount } from 'enzyme';
import { AuthContext } from "../../auth/authContext";

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            stateUser: {
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    });
    test('debe de mostrar el componente de marvel si está autenticado', () => {
        const contextValue = {
            stateUser: {
                logged: true,
                name: 'Ricardo'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    });
});
