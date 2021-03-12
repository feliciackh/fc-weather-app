import Gfycat from "gfycat-sdk";

const gfycatId = process.env.GFYCAT_ID;
const gfycatSecret = process.env.GFYCAT_SECRET;
const gfycat = new Gfycat({client_id: gfycatId, client_secret: gfycatSecret});
const randomNumber = Math.floor(Math.random() * 50);

export default function handler(req, res) {
  const options = {
    search_text: req.query.weather,
    count: 50,
    first: 50
  };

  gfycat.search(options).then(data => {
    res.status(200).json({gif: data.gfycats[randomNumber].gifUrl})
  });
}