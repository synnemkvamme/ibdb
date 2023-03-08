import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import firebaseControl from '../firebaseControl';
import '../styles/HomePage.css';


const AddBookPage = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number | undefined >();
    const [description, setDescription] = useState<string>('');
    const [imgURL, setImgURL] = useState<string>('');
    const [rating, setRating] = useState<number>(0);    
    const [buttonActive, setButtonActive] = useState<boolean>(false);

    const firebaseController = new firebaseControl();
    
    async function addThisBook() {
        if (title.length > 0 && author.length > 0 && genre.length > 0 && description.length > 0 && imgURL.length > 0 && releaseYear !== undefined){
            firebaseController.addBook(title, author, genre, releaseYear, description, imgURL, rating);
            setTitle('');
            setAuthor('');
            setGenre('');
            setReleaseYear(undefined);
            setDescription('');
            setImgURL('');

            //Navigate to the bookpage for the new book
            const newBookId : string = (await firebaseController.findLength()).toString();
            window.location.href = `/bookPage/${newBookId}`
        }
    }


    useEffect(() => {
        if (title.length > 0 && author.length > 0 && genre.length > 0 && description.length > 0 && imgURL.length > 0 && releaseYear !== undefined){
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [title, author, genre, description, imgURL, releaseYear]);

    const genres = [
        { id: 1, genre: "Crime" },
        { id: 2, genre: "Fantasy" },
        { id: 3, genre: "Roman" },
        { id: 4, genre: "Cartoon" },
        { id: 5, genre: "Classic" },
        { id: 6, genre: "Historical" },
        { id: 7, genre: "Biography" }
       ];

       function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setGenre(event.target.value);
      }

    return (
        <div className='w-full'>
            <div className="header mt-5">
                <div className="element"></div>
                    <h1>Add new book</h1>
                </div>
            <div className="px-8 py-4 grid gap-6 md:grid-cols-2 w-2/3 items-center">
                <div>
                    <label className="block mb-2 text-sm font-semibold">Title</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title" 
                        value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Author</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Author" 
                        value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Genre</label>
                    <select id ='genre-select' name ='genre' value={genre} onChange={handleGenreChange} 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        {genres.map(el => <option key={el.id} value={el.genre} >{el.genre}</option>)}
                        <option value="" selected disabled hidden>Select Genre</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Release Year</label>
                    <input 
                    id="releaseYear" 
                    type="number" 
                    placeholder="Release Year" 
                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    value = {releaseYear} onChange={(event) => {setReleaseYear(Number(event.target.value))}}/>
                </div>
            
                
                <div>
                    <label className="block mb-2 text-sm font-semibold">Description</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Description" 
                        value={description} onChange={(event) => {setDescription(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Image URL</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Image URL" 
                        value={imgURL} onChange={(event) => {setImgURL(event.target.value)}}/>
                </div>
                
                <div>
                    {buttonActive ? 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Ready to add the book!</label>
                            <button onClick={addThisBook} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Legg til bok
                            </button>
                        </div>
                        : 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Fill out all fields to add the book to IBDb</label>
                            <button type="button" disabled className="px-6 py-3 rounded-lg shadow-0">
                            Add book
                            </button>
                        </div>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default AddBookPage;