import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './profileFeed.css';

export default function ProfileFeed() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["username", "areasOfExpertise", "title"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    fetch("http://localhost:8800/api/users/mentors")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(users);

  function search(users) {
    return users.filter((user) => {
      if (user.isMentor && (filterParam === "All" || user.areasOfExpertise === filterParam)) {
        return searchParam.some((newItem) => {
          return (
            user[newItem]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          );
        });
      }
    });
  }

  if (error) {
    return <p>{error.message}</p>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="profileFeedWrapper">
        <div className="profileFeedSearchWrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search Mentors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* <span className="profileFeedSrOnly">Search mentors here</span> */}
          </label>

          <div className="select">
            <select
              onChange={(e) => setFilterParam(e.target.value)}
              className="custom-select"
              aria-label="Filter Mentors By Area of Expertise"
            >
              <option value="All">Filter By Speciality</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Product Management">Product Management</option>
              <option value="Data Science">Data Science</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
            <span className="focus"></span>
          </div>
        </div>
        <ul className="card-grid">
          {search(data).map((user) => (
            <li key={user._id}>
              <article className="card">
                <div className="card-content">
                  <h2 className="card-name">{user.username}</h2>
                  <ol className="card-list">
                    <li>
                      Title: <span>{user.title}</span>
                    </li>
                    <li>
                      Works at: <span>{user.company}</span>
                    </li>
                    <li>
                      Speciality: <span>{user.areasOfExpertise}</span>
                    </li>
                    <Link to={`/profile/${user.username}`} className="learn-more-btn">
                      Learn More
                    </Link >
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
