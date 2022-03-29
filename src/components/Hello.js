import React from "react";
import "./Hello.css"
export const Hello = () => {
    return<div className="greetings-div">
        <h2 className="greetings">
        Greetings, and welcome!
        </h2>
        <section className="about">
            <p>I am <a href="https://www.randallthomasmusic.com/">Randall Thomas</a>, the creator and writer of DeeDee's Recipes- where every recipe has a memory and every memory deserves a place to be told.</p>
            <p>First, allow me to say thank you for checking out my (NSS front-end capstone) work and I hope you find everything up to your standards- if not, feel free to <a href="mailto:thesingingdev@gmail.com?subject=DeeDee's Recipes Hello">email me at thesingingdev@gmail.com</a> with suggestions, or feel free to <a href="https://github.com/DevDevvy/deedees-recipes-app">fork my github</a> repository and make the changes yourself and then send me a PR.</p>
            <p>Secondly, let me orient you to what this application is for, and a little about who it is named after.</p>
            <p>I would not be who I am today without the love and support of my family, including my grandparents. My grandmother, Deedee, was one of the most graceous and kind people I have ever met. She was known world wide for her talents and hospitality. Deedee would cook some of the best comfort foods and tell the the most animated stories from her childhood growing up in the south.</p>
            <p>So, this project is a small tribute to a great woman, as well as serves the practical purposes of showing my technical skills as a developer.</p>
            <div className="list-container">
            <article className="hello-list">
                <p>DeeDee's Recipes Features:</p>
                <ul>
                    <li>Create, edit, delete your own custom recipes</li>
                    <li>Every recipe has an attatched memory</li>
                    <li>"Fork" any recipe to make your own version</li>
                    <li>"Love" any recipe to store a list on your home screen</li>
                    <li>Comment under any recipe</li>
                    <li>Browse the master list of recipes</li>
                    <li>Search recipes by name or ingredient</li>
                    <li>Rate recipes 1-5 stars</li>
                    <li>Each recipe has an aggregated time, and rating</li>
                    <li>Custom vector logo created with Inkscape</li>
                    <li>And all painstakingly made with vanilla css</li>
                </ul>
            </article>
            <article className="hello-list">
                <p>This App Uses:</p>
                <ul>
                    <li>React.js framework</li>
                    <li>React-router-dom</li>
                    <li>AOS for scroll effect</li>
                    <li>React-Select</li>
                    <li>Font Awesome</li>
                    <li>Special shout out to flexbox</li>
                </ul>
            </article>
            </div>
        </section>
    </div>
}