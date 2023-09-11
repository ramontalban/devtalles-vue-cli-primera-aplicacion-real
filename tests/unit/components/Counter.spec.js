import {shallowMount} from "@vue/test-utils";
import Counter from "@/components/Counter.vue";

describe('Counter Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('h2 deberia ser por defecto Counter', () => {
        expect(wrapper.find('h2').exists()).toBeTruthy()
        const h2Value = wrapper.find('h2').text()
        expect(h2Value).toBe('Counter')
    })

    test('El segundo parrafo debe tener el valor de 5', () => {
        // const parrafos = wrapper.findAll('p')
        const value = wrapper.find('[data-test-id="counter"]').text()
        //expect(parrafos[1].text()).toBe('5')
        expect(value).toBe('5')
    })

    test('Debe aumentar y decrementar counter al pulsar los botones', async() => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        const value = wrapper.find('[data-test-id="counter"]').text()
        expect(value).toBe('6')
    })

    test('Debe establecer el valor por defecto', () => {
        const {start} = wrapper.props()
        const value = wrapper.find('[data-test-id="counter"]').text()
        expect(Number(value)).toBe(start)
    })

    test('Debe mostrar la prop title', () => {
        const title = 'Pasare esta prueba'
        const wrapper = shallowMount(Counter, {
            props: {
                title: title
            }
        })
        expect(wrapper.find('h2').text()).toBe(title)
    })
})