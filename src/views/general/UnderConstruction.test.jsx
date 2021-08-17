import React from "react";
import { render, screen } from "@testing-library/react";
import UnderConstruction from "./UnderConstruction";

test("renders Under Construction", () => {
  render(<UnderConstruction />);
  const linkElement = screen.getByText(/Under Construction/i);
  expect(linkElement).toBeInTheDocument();
});
