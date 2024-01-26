const { default: axios } = require("axios");

class JurisprevProvider {
  api = axios.create({
    baseURL: process.env.JURISPREV_API_URL,
    headers: {
      Authorization: process.env.JURISPREV_API_TOKEN
    }
  })

  async asignDocument(input) {
    if (!process.env.JURISPREV_API_URL) return;

    const { data } = await this.api.post('asing', input);

    return data;
  }
}

module.exports = JurisprevProvider;