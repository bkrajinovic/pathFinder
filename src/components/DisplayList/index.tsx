import React from "react";
import "./styles.scss";

interface DisplayListProps {
  title: string;
  items: string[];
}

const DisplayList: React.FC<DisplayListProps> = ({ title, items }) => {
  return (
    <div className="display-list">
      {items.length > 0 && <h2 className="display-list__title">{title}</h2>}
      <ul className="display-list__items">
        {items.map((item) => (
          <li key={item} className="display-list__items__item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayList;
