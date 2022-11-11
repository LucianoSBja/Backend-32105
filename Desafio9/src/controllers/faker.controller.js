//* FAKER
import { faker } from "@faker-js/faker";
faker.locale = "es_MX";
const { image, commerce } = faker;
let products = [];
for (let i = 1; i <= 5; i++) {
  products.push({
    title: `${faker.commerce.productName()}`,
    price: `${faker.commerce.price(100, 500)}`,
    thumbnail: `${faker.image.imageUrl()} `,
  });
}

const fakerTest = (req, res) => {
  res.render("faker", { products });
};

export default fakerTest;
