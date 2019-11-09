async function hash(file) {
        const raw = await readFileAsync(file);
        return web3.sha3(raw);
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsText(file);
    })
}