import React from "react";
import "./styles.scss";

const Instructions: React.FC = () => (
  <div className="instructions">
    <h2>Game Instructions</h2>
    <ul>
      <li>Start at the character @</li>
      <li>Follow the path</li>
      <li>Collect letters</li>
      <li>Stop when you reach the character x</li>
      <li>
        The only valid characters are all uppercase letters (A-Z) and other
        characters appearing in the example maps; anything else found must
        result in an error
      </li>
      <li>Turns can be letters or +</li>
      <li>Do not collect a letter from the same location twice</li>
      <li>Ignore stuff after end of path</li>
    </ul>
  </div>
);

export default Instructions;