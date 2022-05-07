import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en <DashboardRoutes />', () => {
    const contextValue = {
        stateUser: {
            logged: true,
            name: 'Ricardo'
        }
    }
    
  test('Debe de mostrarse correctamente - Marvel', () => {
     const wrapper = mount(
         <AuthContext.Provider value={contextValue}>
             <MemoryRouter initialEntries={['/']}>
                 <DashboardRoutes />
             </MemoryRouter>
         </AuthContext.Provider>
     );
     expect(wrapper).toMatchSnapshot();
     expect(wrapper.find('.text-info').text().trim()).toBe('Ricardo');
     expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');
  });
  test('Debe de mostrarse correctamente - DC', () => {
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/DC']}>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>
    );
    expect(wrapper.find('h1').text().trim()).toBe('DCScreen');
 });
});
