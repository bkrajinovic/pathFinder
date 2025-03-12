# PathFinder

PathFinder is a game where you follow a path of characters, collect letters, and stop when you reach the character 'x'. The game is built using React, TypeScript, and Vite.

## Game Instructions

1. Start at the character `@`.
2. Follow the path.
3. Collect letters.
4. Stop when you reach the character `x`.
5. The only valid characters are all uppercase letters (A-Z) and other characters appearing in the example maps ( - or | ); anything else found must result in an error.
6. Turns can be letters or `+`.
7. Do not collect a letter from the same location twice.
8. Ignore stuff after the end of the path.

## Project Setup

### Installation

1. Clone the repository:

```sh
git clone https://github.com/bkrajinovic/pathFinder.git
cd PathFinder
```

2. Install dependencies:

```sh
npm install
```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

This will start the Vite development server and you can view the project in your browser at `http://localhost:3000`.


### Running Tests

To run the tests, run:

```sh
npm test
```

This will run the test suite and display the results in the terminal.

## Project Structure

- `src/components`: Contains the React components used in the project.
- `src/helpers`: Contains helper functions used in the project.
- `src/constants`: Contains constant values used in the project.
- `src/styles`: Contains the SCSS styles used in the project.
- `src/utils`: Contains utility functions used in the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.