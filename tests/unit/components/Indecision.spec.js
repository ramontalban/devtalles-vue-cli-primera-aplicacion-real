import {shallowMount} from "@vue/test-utils";
import Indecision from "@/components/Indecision.vue";

describe('Indecision Component', () => {
    let wrapper
    let consLogSpy

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision)
        consLogSpy = jest.spyOn(console, 'log')
        jest.clearAllMocks()
    })

    test('Debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Escribir en el input no debe disparar nada (console.log)', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('Test')
        expect(consLogSpy).toHaveBeenCalled()
        expect(getAnswerSpy).not.toHaveBeenCalled()
    })

    test('Escribir ? dispara el fetch', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
        const input = wrapper.find('input')
        await input.setValue('?')
        expect(getAnswerSpy).toHaveBeenCalled()
    })

    test('Pruebas en getAnswer', async() => {
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si')
    })

    test('Pruebas en getAnswer - Fallo en API', async() => {
        fetch.mockImplementationOnce(() => Promise.reject('API is down'))
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img')
        expect( img.exists()).toBeFalsy()
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API')
    })

    test('', () => {

    })

})