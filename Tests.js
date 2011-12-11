module('test');

test('Posso transformar um json com uma propriedade simples em um form serializado', function () {
    var model = { Nome: "Alberto" };
    equal(jsonToFormUrlencoded(model), 'Nome=Alberto');
});

test('Posso transformar um json com mais de uma propriedade simples em um form serializado', function () {
    var model = { Nome: "Alberto", Idade: 21 };
    equal(jsonToFormUrlencoded(model), 'Nome=Alberto&Idade=21');
});

test('Posso transformar um json aninhando so com propriedades simples em um form serializado', function () {
    var model = {
        Nome: "Alberto",
        Idade: 21,
        Endereco: {
            Logradouro: "Rua Paulino Nogueira",
            Ap: {
                Numero: 283
            }
        }
    };
    equal(jsonToFormUrlencoded(model), 'Nome=Alberto&Idade=21&Endereco.Logradouro=Rua+Paulino+Nogueira&Endereco.Ap.Numero=283');
});

test('Posso transformar um json que contenha propriedades do tipo array de objeto simples em um form serializado', function () {
    var model = {
        Nome: "Alberto",
        Idade: 21,
        Valores: [1, 2, 3]
    };
    equal(jsonToFormUrlencoded(model), 'Nome=Alberto&Idade=21&Valores[0]=1&Valores[1]=2&Valores[2]=3');
});

test('Posso transformar um json que contenha propriedades do tipo array de objeto complexo em um form serializado', function () {
    var model = {
        Nome: "Alberto",
        Idade: 21,
        Valores: [{ Valor: 1 }, { Valor: 2}]
    };
    equal(jsonToFormUrlencoded(model), 'Nome=Alberto&Idade=21&Valores[0].Valor=1&Valores[1].Valor=2');
});

test('Posso transformar um json em um form serializado', function () {
    var model = {
        Codigo: "1",
        Nome: "Fortes Informatica",
        Estabelecimentos: [{ Codigo: "1", Nome: "Matriz" }, { Codigo: "2", Nome: "Benfica"}]
    };
    equal(jsonToFormUrlencoded(model), 'Codigo=1&Nome=Fortes+Informatica&Estabelecimentos[0].Codigo=1&Estabelecimentos[0].Nome=Matriz&Estabelecimentos[1].Codigo=2&Estabelecimentos[1].Nome=Benfica');
});

test('Posso transformar um json em um form serializado fodasticamente', function () {
    var model = {
        Codigo: "1",
        Nome: "Fortes Informatica",
        Estabelecimentos: [{
            Codigo: "1",
            Nome: "Matriz",
            V: [{ VV: 1}]
        }, {
            Codigo: "2",
            Nome: "Benfica",
            V: [{ VV: 2}]
        }]
    };
    equal(jsonToFormUrlencoded(model),
    'Codigo=1&Nome=Fortes+Informatica&Estabelecimentos[0].Codigo=1&Estabelecimentos[0].Nome=Matriz&Estabelecimentos[0].V[0].VV=1&Estabelecimentos[1].Codigo=2&Estabelecimentos[1].Nome=Benfica&Estabelecimentos[1].V[0].VV=2');
});

test('Esse teste fodao tem que passar', function () {
    var model = JSON.parse('{"Codigo":"3","Nome":"Fortes ","Estabelecimentos":[{"Codigo":"1","Nome":"Matriz"},{"Codigo":"2","Nome":"Local"}],"estabelecimentoSelecionado":null}');
    equal(jsonToFormUrlencoded(model),
    'Codigo=3&Nome=Fortes&Estabelecimentos[0].Codigo=1&Estabelecimentos[0].Nome=Matriz&Estabelecimentos[1].Codigo=2&Estabelecimentos[1].Nome=Local');
});