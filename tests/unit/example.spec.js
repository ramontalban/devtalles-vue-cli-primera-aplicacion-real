
describe('Example Component', () => {
  test('Debe ser mayor a 10', () => {
    // Arreglo
    let value = 9;

    // Estimulo
    value = value + 2

    // Observar el resultado
    expect(value).toBeGreaterThan(10)
  })
})