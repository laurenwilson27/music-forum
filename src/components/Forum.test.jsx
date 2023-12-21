import { render, screen } from "@testing-library/react";
import Header from "./Header";
import ForumList from "./ForumList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestWithMockData from "./TestWithMockData";
import Register from "./Register";

describe("Forum testing", () => {
  test("1. renders correctly", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const linkElement = screen.getByText(/Header/i);
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
  test("3. registration requried fields", () => {
    render(<Register />);
  });
});
