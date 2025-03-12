import React from "react";
import "./styles.scss";

interface DisplayListProps {
  title: string;
  items: string[];
}

const DisplayList: React.FC<DisplayListProps> = ({ title, items }) => {
  return (
    <div className="display-list">
      <h2 className="display-list__title">{items.length ? title : ""}</h2>
      <div className="display-list__items">
        {items?.map((item, index) => (
          <div key={index} className="display-list__items__item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayList;
