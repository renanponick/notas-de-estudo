const { describe, expect, it } = require('@jest/globals');
const calculator = require('../src/operations');

describe('Calculator Tests - Total (40)', () => {
   // Executado antes de TODOS os testes
   beforeAll(async () => {
      console.info('Iniciando TDD com jest!');
   });

   // Executado após TODOS os testes
   afterAll(() => {
      console.info('Encerrados os testes');
   });

   it('Should sum two numbers (5)', () => {
      let result = calculator.sum(1, 2)
      expect(result).toEqual(3)

      result = calculator.sum(-1, 2)
      expect(result).toEqual(1)

      result = calculator.sum(0, 1)
      expect(result).toEqual(1)

      result = () => calculator.sum('a', 1)
      expect(result).toThrow('Um ou mais parâmetros são letras')

      result = () => calculator.sum(1, 'a')
      expect(result).toThrow('Um ou mais parâmetros são letras')
   })

   it('Should sub two numbers (5)', () => {
      let result = calculator.sub(3, 2)
      expect(result).toEqual(1)

      result = calculator.sub(2, 3)
      expect(result).toEqual(-1)

      result = calculator.sub(0, -3)
      expect(result).toEqual(3)

      result = () => calculator.sub('a', 1)
      expect(result).toThrow('Um ou mais parâmetros são letras')

      result = () => calculator.sub(1, 'a')
      expect(result).toThrow('Um ou mais parâmetros são letras')
      
   })

   it('Should mul two numbers (8)', () => {
      let result = calculator.mul(1, 2)
      expect(result).toEqual(2)
      
      result = calculator.mul(2, 1)
      expect(result).toEqual(2)

      result = calculator.mul(2, 0)
      expect(result).toEqual(0)

      result = calculator.mul(0, 2)
      expect(result).toEqual(0)

      result = calculator.mul(4, -2)
      expect(result).toEqual(-8)
   
      result = calculator.mul(-4, -2)
      expect(result).toEqual(8)

      result = () => calculator.mul('a', 1)
      expect(result).toThrow('Um ou mais parâmetros são letras')

      result = () => calculator.mul(1, 'a')
      expect(result).toThrow('Um ou mais parâmetros são letras')
      
   })

   it('Should div two numbers (9)', () => {
      let result = calculator.div(2, 2)
      expect(result).toEqual(1)

      result = calculator.div(1, 2)
      expect(result).toEqual(0.5)

      result = calculator.div(2, 1)
      expect(result).toEqual(2)

      result = calculator.div(4, -2)
      expect(result).toEqual(-2)
   
      result = calculator.div(-4, -2)
      expect(result).toEqual(2)

      result = calculator.div(0, 2)
      expect(result).toEqual(0)

      result = () => calculator.div('a', 1)
      expect(result).toThrow('Um ou mais parâmetros são letras')

      result = () => calculator.div(1, 'a')
      expect(result).toThrow('Um ou mais parâmetros são letras')
   
      result = () => calculator.div(2, 0)
      expect(result).toThrow('Infinity')

   })

   it('Should sqrt a number (4)', () => {
      let result = calculator.sqrt(4)
      expect(result).toEqual(2)

      result = calculator.sqrt(0)
      expect(result).toEqual(0)

      result = () => calculator.sqrt(-4)
      expect(result).toThrow('Impossível')

      result = () => calculator.sqrt('a')
      expect(result).toThrow('Um ou mais parâmetros são letras')
   })

   it('Should pow a number (9)', () => {
      let result = calculator.pow(3, 2)
      expect(result).toEqual(9)

      result = calculator.pow(2, 3)
      expect(result).toEqual(8)

      result = calculator.pow(-2, 2)
      expect(result).toEqual(4)

      result = calculator.pow(2, -2)
      expect(result).toEqual(0.25)

      result = calculator.pow(-2, -2)
      expect(result).toEqual(0.25)

      result = calculator.pow(2, 0)
      expect(result).toEqual(1)

      result = calculator.pow(0, 2)
      expect(result).toEqual(0)

      result = () => calculator.pow(2, 'a')
      expect(result).toThrow('Um ou mais parâmetros são letras')

      result = () => calculator.pow('a', 2)
      expect(result).toThrow('Um ou mais parâmetros são letras')
   })

})
