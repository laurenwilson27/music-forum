import { render, screen } from "@testing-library/react";
import Header from "./Header";
import ForumList from "./ForumList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestWithMockData from "./TestWithMockData";
import Register from "./Register";
import user from "@testing-library/user-event";

describe("Forum testing", () => {
  test("1. renders correctly", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const linkElement = screen.getByText(/FOGTOWN ECHOES/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("2. data renders succesfully", () => {
    render(
      <Router>
        <TestWithMockData />
      </Router>
    );
    expect(screen.getByText(/Metal Discussion/i)).toBeInTheDocument();
  });
  test("3. registration requried fields", async () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const registerButton = screen.getByRole("button");
    await user.click(registerButton);
    expect(screen.getByText("You must enter a name")).toBeInTheDocument();
  });
});
