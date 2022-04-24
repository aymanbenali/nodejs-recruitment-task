import { getMovieDetailsFromOmdb } from "../controller/omdb.server.controller";
import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Test getting movie data from omdb by title", () => {
  it("Throw error in case of no movie title provided", async () => {
    await expect(getMovieDetailsFromOmdb()).rejects.toThrow(
      "The title is required"
    );
  });

  it("Throw error in case of no api key provided", async () => {
    await expect(getMovieDetailsFromOmdb("The Batman")).rejects.toThrow(
      "The Omdb api key is missing"
    );
  });

  it("Get 200 status and received data", async () => {
    axios.get.mockResolvedValue({
      success: true,
      status: 200,
      data: {
        Title: "The Batman",
        Released: "04 Mar 2022",
        Genre: "Action, Crime, Drama",
        Director: "Matt Reeves",
        Response: true,
      },
    });
    const result = await getMovieDetailsFromOmdb(
      "The Batman",
      process.env.OMDB_API
    );
    expect(result).toEqual({
      Title: "The Batman",
      Released: "04 Mar 2022",
      Genre: "Action, Crime, Drama",
      Director: "Matt Reeves",
    });
  });

  it("Get 200 status but response false and error because movie name not recognize", async () => {
    axios.get.mockResolvedValue({
      success: true,
      status: 200,
      data: { Response: "False", Error: "Movie not found!" },
    });
    await expect(
      getMovieDetailsFromOmdb("lorem ipsum", process.env.OMDB_API)
    ).rejects.toThrow("Movie not found!");
  });
});
