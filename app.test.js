const supertest = require("supertest");
const app = require("./app.js");

const request = supertest(app);

test("GET /", async () => {
  const response = await request
    .get("/")
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8");

  expect(response.body).toEqual({ planet: "earth" });
});
