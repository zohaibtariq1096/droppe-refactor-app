import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import ShopApp from "./shop-app";

test("fetches and displays products from API", async () => {
    const mockData = [
        { 
            title: "DANVOUY Womens T Shirt Casual Cotton Short", 
            description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.", 
            price: "12.99" 
        }
    ];
    jest.spyOn(window, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
    } as any);
    render(<ShopApp />);
    const productTitle = await screen.findByText(/DANVOUY Womens T Shirt Casual Cotton Short/i);
    expect(productTitle).toBeInTheDocument();
});

test("adds new product on form submit", async () => {

    render(<ShopApp />);
    fireEvent.click(screen.getByText("Send product proposal"));
    // Check that modal is displayed
    const addProBtnText = await screen.findByText(/Add a Product/i);
    expect(addProBtnText).toBeInTheDocument();
    // Fill out form and submit
    fireEvent.change(screen.getByPlaceholderText("Title..."), { target: { value: "New Product" } });
    fireEvent.change(screen.getByPlaceholderText("Start typing product description here..."), { target: { value: "New Description" } });
    fireEvent.change(screen.getByPlaceholderText("Price..."), { target: { value: "30.00" } });
    fireEvent.click(addProBtnText);
    const newProductTitle = await screen.findByText(/New Product/i);
    expect(newProductTitle).toBeInTheDocument();
});

test("toggles favorite state of product on favorite button click", async () => {
    render(<ShopApp />);
    const favrtTitle = await screen.findByText(/Add to favorites/i);
    fireEvent.click(favrtTitle);
    const unFavrtTitle = await screen.findByText(/Remove from favorites/i);
    expect(unFavrtTitle).toBeInTheDocument();
    fireEvent.click(unFavrtTitle);
    expect(favrtTitle).toBeInTheDocument();
});
