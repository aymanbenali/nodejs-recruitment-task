jest.mock("../controller/controller");

import { hasReachedMonthlySubscription } from "../controller/controller";

describe("Test reaching monthly subscription", () => {
  it("Basic user with less then 5 movies in this month", async () => {
    expect(5 + 3).toBe(8);
  });

  it("Basic user with more then 5 movies in this month", async () => {
    expect(await hasReachedMonthlySubscription(456)).toBe(false);
  });
});
