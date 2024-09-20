import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
    const countries = ['England', 'France', 'Germany', 'Sweden', 'Norway', 'Finland'];


    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * countries.length);

    // Get the random item from the array
    const country = countries[randomIndex];
    const apiKey = process.env.EUROPEANA_API_KEY;

    try {
        // Store the API response in a variable
        let response = await fetch(`https://api.europeana.eu/record/v2/search.json?has_thumbnail=true&rows=100&query=*&profile=facets&wskey=${apiKey}&facet=YEAR&qf=collection%3Aphotography`);

        // If the call failed, throw an error
        if (!response.ok) {
            throw 'Something went wrong.';
        }

        // Otherwise, get the post JSON
        let data = await response.json();

        return NextResponse.json({ data }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }   
}