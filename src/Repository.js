import React from "react";
import { FaStar } from "react-icons/fa";
import { VscRepoForked } from "react-icons/vsc";

export default function Repository({
  id,
  name,
  description,
  owner_name,
  stars,
  forks_count,
  language,
  html_url,
}) {
  return (
    <article className="repo">
      <div className="repo-footer">
        <h3>{name && name.length>=15?name.slice(0,15)+"...":name}</h3>
        <h4>{owner_name}</h4>
        <p>{description && description.length>=200?description.slice(0,200)+"...":description}</p>

        <h4>
          <FaStar />
          <span> </span>
          {stars}
        </h4>

        <h4>
          <VscRepoForked />
          <span> </span> 
          {forks_count}
        </h4>
        <br/>
        <h4>{language}</h4>
        <br/>
        <a href={html_url} className="btn">
          view Repository
        </a>
      </div>
    </article>
  );
}
