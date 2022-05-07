import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))

describe('Pruebas en <SearchScreen />', () => {
  test('Debe de mostrar correctamente con valores por defecto', () => {
      const wrapper = mount(
          <MemoryRouter initialEntries={['/search']}>
              <SearchScreen />
          </MemoryRouter>
      );
      console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();      
    expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');  
  });
  test('Debe de mostrar a batman y el input con el valor del queryString', () => {
    const searchHero = 'batman'  
    const wrapper = mount(
        <MemoryRouter initialEntries={['/search?q='+searchHero]}>
            <SearchScreen />
        </MemoryRouter>
    );
    expect(wrapper.find('input').prop('value')).toBe(searchHero)
  });
  test('Debe de mostrar un error si no se encuentra el heroe', () => {
    const searchHero = 'batman123'  
    const wrapper = mount(
        <MemoryRouter initialEntries={['/search?q='+searchHero]}>
            <SearchScreen />
        </MemoryRouter>
    );
    expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultado: '+searchHero);  
  });
  test('Debe de llamar el navigate a la nueva pantalla', async () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/search']}>
            <SearchScreen />
        </MemoryRouter>
    );
    wrapper.find('input').simulate('change',{
        target:{
            name: 'searchText',
            value: 'batman'
        }
    });
    wrapper.find('form').prop('onSubmit')({
        preventDefault: ()=>{}
    });
    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
  });
  
});
