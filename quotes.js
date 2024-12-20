const quotes = [
    {
        text: "All we have to decide is what to do with the time that is given us.",
        author: "Gandalf"
    },
    {
        text: "Even the smallest person can change the course of the future.",
        author: "Galadriel"
    },
    {
        text: "There's some good in this world, Mr. Frodo, and it's worth fighting for.",
        author: "Samwise Gamgee"
    },
    {
        text: "Not all those who wander are lost.",
        author: "Bilbo Baggins"
    },
    {
        text: "Deeds will not be less valiant because they are unpraised.",
        author: "Aragorn"
    }
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
