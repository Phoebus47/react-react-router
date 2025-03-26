import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

let products = [
  {
    id: 1,
    name: "Fond - Neutral",
    price: 160,
    image: "http://dummyimage.com/350x350.png/dddddd/000000",
    description: "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    id: 2,
    name: "Pepper - Cubanelle",
    price: 7624,
    image: "http://dummyimage.com/350x350.png/cc0000/ffffff",
    description: "Nulla facilisi.",
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    price: 41900,
    image: "http://dummyimage.com/350x350.png/5fa2dd/ffffff",
    description: "The latest iPhone with powerful A17 Pro chip and titanium design.",
  },
  {
    id: 4,
    name: "MacBook Air M2",
    price: 44900,
    image: "http://dummyimage.com/350x350.png/4287f5/ffffff",
    description: "Ultra-thin laptop with amazing performance and battery life.",
  },
  {
    id: 5,
    name: "iPad Air",
    price: 23900,
    image: "http://dummyimage.com/350x350.png/00ff00/ffffff",
    description: "Versatile tablet for work and play with M1 chip.",
  },
  {
    id: 6,
    name: "AirPods Pro",
    price: 8990,
    image: "http://dummyimage.com/350x350.png/ff69b4/ffffff",
    description: "Premium wireless earbuds with active noise cancellation.",
  },
  {
    id: 7,
    name: "Apple Watch Series 9",
    price: 15900,
    image: "http://dummyimage.com/350x350.png/ffd700/000000",
    description: "Advanced health and fitness companion for your wrist.",
  },
  {
    id: 8,
    name: "HomePod mini",
    price: 3290,
    image: "http://dummyimage.com/350x350.png/9932cc/ffffff",
    description: "Compact smart speaker with amazing sound quality.",
  }
];

const app = express();
const port = 4001;
let id = 9;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.json({
    data: products,
  });
});

app.get("/products/:id", (req, res) => {
  const productId = +req.params.id;
  const hasFound = products.find((post) => post.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  const product = products.filter((product) => product.id === productId);

  return res.json({
    data: product[0],
  });
});

app.post("/products", (req, res) => {
  products.push({
    id: id,
    ...req.body,
  });
  id++;
  console.log(products);
  return res.json({
    message: "Product has been created.",
  });
});

app.put("/products/:id", (req, res) => {
  const updatedProduct = req.body;
  const productId = +req.params.id;

  const hasFound = products.find((product) => product.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  const productIndex = products.findIndex((post) => {
    return post.id === +productId;
  });

  products[productIndex] = {
    id: productId,
    ...updatedProduct,
  };

  return res.json({
    message: `Product ${productId} has been updated.`,
  });
});

app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;

  const hasFound = products.find((product) => product.id === productId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Product ${productId} not found`,
    });
  }

  products = products.filter((product) => {
    return productId !== product.id;
  });

  return res.json({
    message: `Product ${productId} has been deleted.`,
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
