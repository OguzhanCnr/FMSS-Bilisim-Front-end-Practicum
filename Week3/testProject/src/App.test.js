import React from "react";
import { render,screen,fireEvent } from "@testing-library/react";
import App from "./App";
import Header from "./Header";
import "@testing-library/jest-dom";
import filterEmoji from "./filterEmoji";

//Header componentimizi render edip etmediğimizi test ediyoruz
test("renders header component", () => {
  //getByTestId ile testid si header olanı çağırıyoruz ve dökümanda var mı bakıyoruz
  const { getByTestId } = render(<Header />);
  const headerElement = getByTestId("header");
  expect(headerElement).toBeInTheDocument();
});

//App yüklenince emoji listesi geliyor mu onu test ettiğimiz fonksiyon
it('render the emoji results list on app load', () => {
  render(<App />);
  const emojiList = screen.getByTestId('emoji-results');
  expect(emojiList).toBeInTheDocument();
});

//Emojiye tıklayınca kopyalayıp kopyalamadığını test ettiğimiz fonksiyon
it("copy emoji when clicked", () => {
  // Create a mock function for execCommand
  document.execCommand = jest.fn();

  // Render the component and simulate click event on emoji row
  const { getAllByTestId } = render(<App />);
  const emojiRows = getAllByTestId("emoji-result-row");
  emojiRows.forEach((row) => {
    fireEvent.click(row);

    // Expect execCommand to have been called with "copy"
    expect(document.execCommand).toHaveBeenCalledWith("copy");

    // Clean up mock function
    document.execCommand.mockClear();
  });
});

//Kopyaladığımız emoji ile tıkladığımız aynı mı onu test ediyoruz
test("clicking emoji row copies the emoji", () => {
  // spy the execCommand method
  const spy = jest.spyOn(document, "execCommand");

  const { getAllByTestId } = render(<App />);
  const emojiRows = getAllByTestId("emoji-result-row");

  emojiRows.forEach((row) => {
    fireEvent.click(row);
    expect(spy).toHaveBeenCalledWith("copy");
  });

  spy.mockRestore();
});


//Filtreleme işlemlerini yaptığımız test fonksiyonu
describe("filterEmoji", () => {
  it("returns correct results for searchText '100' and maxResults 1", () => {
    const filteredEmoji = filterEmoji("100", 1);

    expect(filteredEmoji).toEqual([{ title: "100", symbol: "💯", keywords: "hundred points symbol symbol wow wow win win perfect perfect parties parties", }]);
  });

   it("returns correct results for searchText 'joy' and maxResults 3", () => {
     const filteredEmoji = filterEmoji("joy", 3);

     expect(filteredEmoji).toEqual([
   { title: "Joy", symbol: "😂", keywords: "face with tears of joy happy silly smiley cry laugh laugh emotion emotion sarcastic sarcastic" },
  { title: "Joy Cat", symbol: "😹", keywords: "cat face with tears of joy happy silly cry laugh laugh cat cat animal animal sarcastic sarcastic" }, { title: "Joystick", symbol: "🕹", keywords:"joystick electronics game boys night boys night" }
    ]);
   });

});
