import { render, screen } from "@testing-library/react";
import Header from "./Header";
import ForumList from "./ForumList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  test("2. metal genre shows metal discussion", () => {
    render(
      <Router>
        <ForumList />
      </Router>
    );
    const metalElement = screen.getByRole("cell");
    expect(metalElement).toHaveTextContent("Metal Discussion");
  });
});
