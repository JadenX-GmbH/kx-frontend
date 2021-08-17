const faker = require('faker');

function generateDataScientists(i) {

    let users = []

    for (let id = 1; id <= i; id++) {
        let id = faker.datatype.uuid;
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        let rating = faker.datatype.number(0, 10);
        let image = faker.image.imageUrl(400,400,"people");

        users.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "rating": rating,
            "image": image
        });
    }

    return users
}

export default generateDataScientists;


