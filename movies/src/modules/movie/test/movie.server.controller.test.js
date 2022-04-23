import request from "supertest";
import app from "../../../server";
import jwt from "jsonwebtoken";
import omdb from "../../omdbapi/controller/omdb.server.controller";
import * as db from "../../../../models";

const authorize = (user) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET, {
    issuer: "https://www.netguru.com/",
    subject: "123",
    expiresIn: 30 * 60,
  });
};

afterEach(() => {
  jest.clearAllMocks();
});

jest.spyOn(db.Movies, "create").mockReturnValue(() => ({
  title: "The Batman",
  released: "04 Mar 2022",
  genre: "Action, Crime, Drama",
  director: "Matt Reeves",
  userId: 123,
}));

describe("Test http status for all clients", () => {
  let apiKey;
  const userDetails = { userId: 123, name: "Basic Thomas", role: "basic" };
  beforeAll(() => (apiKey = authorize(userDetails)));

  it("Get /api/movies => 200 status because the user is authorized", async () => {
    await request(app)
      .get("/api/movies")
      .set("authorization", `Bearer ${apiKey}`)
      .expect(200);
  });

  it("Get /api/movies => 401 status because the user is not authorized", async () => {
    await request(app).get("/api/movies").expect(401);
  });

  it("Post /api/movies => 400 status if title does not exist or is empty", async () => {
    await request(app)
      .post("/api/movies")
      .set("authorization", `Bearer ${apiKey}`)
      .send({ title: "" })
      .expect(400);
  });
  it("Post /api/movies => 201 status and should create a movie", async () => {
    jest.spyOn(omdb, "getMovieDetailsFromOmdb").mockReturnValue(() => ({
      title: "The Batman",
      released: "04 Mar 2022",
      genre: "Action, Crime, Drama",
      director: "Matt Reeves",
    }));

    await request(app)
      .post("/api/movies")
      .set("authorization", `Bearer ${apiKey}`)
      .send({ title: "The Batman" })
      .expect(201);
  });
  it("Post /api/movies => 401 status because the user is not authorized", async () => {
    await request(app).get("/api/movies").expect(401);
  });
});

describe("Test http requests status with basic account", () => {
  let apiKey;
  const userDetails = { userId: 123, name: "Basic Thomas", role: "basic" };
  beforeAll(() => (apiKey = authorize(userDetails)));

  it("Post /api/movies => 422 status if user has reached the monthly limit", async () => {
    jest.spyOn(db.Movies, "count").mockReturnValue(8);
    await request(app)
      .post("/api/movies")
      .set("authorization", `Bearer ${apiKey}`)
      .send({ title: "The Batman" })
      .expect(422);
  });
});

describe("Test http requests status with premium account", () => {
  let apiKey;
  const userDetails = { userId: 434, name: "Premium Jim", role: "premium" };
  beforeAll(() => (apiKey = authorize(userDetails)));

  jest.spyOn(db.Movies, "create").mockReturnValue(() => ({
    title: "The Batman",
    released: "04 Mar 2022",
    genre: "Action, Crime, Drama",
    director: "Matt Reeves",
    userId: 434,
  }));

  it("Post /api/movies => 201 status if user has reached the monthly limit for basic accounts only", async () => {
    jest.spyOn(db.Movies, "count").mockReturnValue(8);
    await request(app)
      .post("/api/movies")
      .set("authorization", `Bearer ${apiKey}`)
      .send({ title: "The Batman" })
      .expect(201);
  });
});
