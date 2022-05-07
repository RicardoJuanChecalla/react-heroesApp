import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from "../../../components/hero/HeroScreen";
const mockNavigate = jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate
}))
describe('Pruebas en <HeroScreen />', () => { 
    
    test('No debe mostrar el HeroScreen si no hay un héroe en el URL', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe']}>
                <Routes>
                    <Route path='/heroe' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
     });
     test('Debe mostrar un heroe si el parámetro existe y se encuentra', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path='/heroe/:heroId' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
     });
     test('Debe de regresar a la pantalla anterior', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider']}>
                <Routes>
                    <Route path='/heroe/:heroId' element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith(-1);
      });
      test('Debe de mostrar el No Hero Page si no tenemos un héroe', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/marvel-spider123456789']}>
                <Routes>
                    <Route path='/heroe/:heroId' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
      });
 })