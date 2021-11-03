function generador(param) {
  let n = [];
  let iteraciones = param;

  function number() {
    return Math.floor(Math.random() * (1000 - 1) + 1);
  }
  
  for (let i = 0; i < iteraciones; i++) {
    n.push(number());
  }

  let repetidos = n.reduce(
    (acc, cur) => (acc[cur] ? (acc[cur] += 1) : (acc[cur] = 1), acc),
    {}
  );

  return repetidos;
}

process.on("random", (message) => {
  let data = generador(message.number);
  process.send(data);
  process.exit();
});
