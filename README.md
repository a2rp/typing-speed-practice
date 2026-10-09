![Project screenshot](./screenshot.png)

# Keyline

Keyline provides a quiet timed typing test and reports words per minute and character accuracy.

Live site: https://a2rp.github.io/typing-speed-practice/

## How to use it

Choose a 30- or 60-second test and begin typing the displayed passage. The timer starts on the first keystroke. The passage highlights matching and missed characters, then shows a final score.

## Features

- Thirty- and sixty-second test lengths
- Timer starts with the first typed character
- Live character-by-character passage feedback
- Words per minute calculated with five characters per word
- Accuracy score based on matching typed characters

## Data and limits

Typing input and results stay in page state for the current session. They are not uploaded or saved after the page closes.

The test uses one included passage and does not include a leaderboard or account.

## Run locally

Install Node.js, then run these commands from the project folder:

    npm install
    npm run dev

## Checks and deployment

    npm run lint
    npm run build
    npm run deploy

The deploy command builds the site and publishes the contents of dist to the gh-pages branch. The project is configured for GitHub Pages at https://a2rp.github.io/typing-speed-practice/.

## Future improvements

These are ideas only and are not implemented yet:

- Add more passage topics and difficulty levels (idea, not implemented)
- Keep a local history of results (idea, not implemented)
- Offer a practice mode without a timer (idea, not implemented)

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [mailto:ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/ashishranjan](https://buymeacoffee.com/ashishranjan)
- Patreon: [https://www.patreon.com/ashishranjan](https://www.patreon.com/ashishranjan)