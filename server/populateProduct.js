const Product = require('./models/product').Products;
const Order = require('./models/order').Orders;

const PopulateProduct = () => {

    const hogwarts = new Product({
        title: 'Horgwarts',
        description: 'Já se imaginou conhecendo a melhor escola de bruxaria do mundo!? Agora é a sua chance!',
        price: 5000,
        availability: 20,
        image: 'hogwarts.jpg',
    });

    const the_shire = new Product({
        title: 'The Shire',
        description: 'O Condado é um dos lugares mais belos e tranquilos. Você terá toda a hospitalidade dos hobbits.',
        price: 5000,
        availability: 20,
        image: 'the_shire.jpg',
    });

    const mordor = new Product({
        title: 'Mordor',
        description: 'Se você gosta de uma aventura mais sombria, com certeza Mordor é o destino certo.',
        price: 3500,
        availability: 20,
        image: 'mordor.jpg',
    });

    const kings_landing = new Product({
        title: "King's Landing",
        description: 'Conheça toda a imponência da terra do Rei. Mas fique de olhos abertos.',
        price: 4000,
        availability: 20,
        image: 'kings_landing.jpg',
    });

    const kattegat = new Product({
        title: 'Kattegat',
        description: 'Venha tomar dançar e tomar cerveja nas tavrnas de Kattegat.',
        price: 3000,
        availability: 20,
        image: 'kattegat.jpg',
    });

    Order.remove({}, () => console.log('A collection "orders" foi apagada.'))
    Product.remove({}, () => {
        console.log('A collection "products" foi zerada. Preparando para repopular.')
        hogwarts.save()
        the_shire.save()
        mordor.save()
        kings_landing.save()
        kattegat.save()
        console.log('A collection "products" foi populada.')
    }) 
}

module.exports = PopulateProduct