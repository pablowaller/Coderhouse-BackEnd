const PRODUCTS_TEMPLATE = `{{#each products}}
<tr> <th scope="row">{{this.id}}</th> <td>{{this.title}}</td> <td>{{this.price}}</td>
<td><img src="{{this.thumbnail}}" alt="Imagen del producto"
style="width: 50px; border-radius: 25px 25px 25px 25px" /></td> </tr>
{{/each}}`;

const MESSAGES_TEMPLATE = `{{#each messages}}
        <div class="d-flex">
          <label class="label text-primary d-flex align-items-center">{{this.author.email}}</label>
          <label class="label text-danger d-flex align-items-center">[{{this.timestamp}}] : </label>
          <label class="label text-success d-flex align-items-center"><i> {{this.message}}</i></label>
          <img src="{{this.author.avatar}}" alt="Imagen del author"
          style="height: 30px; border-radius: 25px 25px 25px 25px" />
        </div>
{{/each}}
`;

const COMPRESSOR_PERCENTAGE = `<label class="label text-primary">Compresión {{percentage}}%</label>
`;

fetch("/mensajes/leer", {
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((respuesta) => respuesta.json())
  .then((messages) => {
    if (!messages || messages.length === 0) {
      return;
    }
    const template = Handlebars.compile(MESSAGES_TEMPLATE);
    document.getElementById("messagesContainer").innerHTML = template({
      messages: messages,
    });

    console.log(document.getElementById("messagesContainer").innerHTML);
  })
  .catch((error) => console.error(error));

const socket = io.connect();

const formatearFecha = (f) =>
  `${f.getDate()}-${
    f.getMonth() + 1
  }-${f.getFullYear()} ${f.getHours()}: ${f.getMinutes()}:${f.getSeconds()}`;

document
  .getElementById("btnSaveProduct")
  .addEventListener("click", function (event) {
    const product = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value,
    };

    fetch("/productos/guardar", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(product),
    })
      .then((respuesta) => respuesta.json())
      .then((products) => {
        form.reset();
        const template = Handlebars.compile(PRODUCTS_TEMPLATE);
        document.getElementById("productsContainer").innerHTML = template({
          products: products,
        });
      })
      .catch((error) => console.error(error));
  });

socket.on("products", (products) => {
  const template = Handlebars.compile(PRODUCTS_TEMPLATE);
  document.getElementById("productsContainer").innerHTML = template({
    products: products,
  });
});

const schemaAuthor = new normalizr.schema.Entity(
  "author",
  {},
  { idAttribute: "email" }
);

const schemaMessage = new normalizr.schema.Entity(
  "post",
  { author: schemaAuthor },
  { idAttribute: "_id" }
);

const schemaMessages = new normalizr.schema.Entity(
  "posts",
  {
    messages: [schemaMessage],
  },
  { idAttribute: "id" }
);

document
  .getElementById("btnSaveMessage")
  .addEventListener("click", function (event) {
    const message = {
      author: {
        email: document.getElementById("txtEmail").value,
        name: document.getElementById("txtName").value,
        lastName: document.getElementById("txtLastName").value,
        age: document.getElementById("txtAge").value,
        alias: document.getElementById("txtAlias").value,
        avatar: document.getElementById("txtAvatar").value,
      },
      date: formatearFecha(new Date()),
      message: document.getElementById("txtMessage").value,
    };

    fetch("/mensajes/guardar", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(message),
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data.normalizedData);

        const messages = normalizr.denormalize(
          data.normalizedData.result,
          schemaMessages,
          data.normalizedData.entities
        );

        let template = Handlebars.compile(MESSAGES_TEMPLATE);
        document.getElementById("messagesContainer").innerHTML = template({
          messages: messages.messages,
        });

        template = Handlebars.compile(COMPRESSOR_PERCENTAGE);
        document.getElementById("percentageCompressor").innerHTML = template({
          percentage: data.percentage,
        });
      })
      .catch((error) => console.error(error));
  });

socket.on("messages", (normalizedMessages) => {
  const messages = normalizr.denormalize(
    normalizedMessages.result,
    schemaMessages,
    normalizedMessages.entities
  );

  const template = Handlebars.compile(MESSAGES_TEMPLATE);
  document.getElementById("messagesContainer").innerHTML = template({
    messages: messages.messages,
  });
});
