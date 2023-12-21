import { Fragment } from "react";
import { Link } from "react-router-dom";

const TestWithMockData = () => {
  const mockData = [
    {
      id: 1,
      name: "Metal",
      forums: [
        {
          id: 1,
          genreId: 1,
          name: "Metal Discussion",
          desc: "A space for open conversations covering various topics related to music, providing a platform for sharing opinions, ideas, and experiences within the community.",
          count: 2,
          icon: "fa-brands fa-microblog",
          timestamp: 1703109118000,
        },
        {
          id: 2,
          genreId: 1,
          name: "Events",
          desc: "An area dedicated to the promotion of calendared music-related events in Newfoundland, including concerts, festivals, workshops, and gatherings.",
          count: 0,
          icon: "fa-regular fa-calendar-days",
        },
        {
          id: 3,
          genreId: 1,
          name: "Local Music Artists",
          desc: "Dedicated to showcasing the musicians from the local music scene, fostering support and recognition within the community.",
          count: 0,
          icon: "fa-solid fa-guitar",
        },
        {
          id: 4,
          genreId: 1,
          name: "New Releases and Promotions",
          desc: "A forum highlighting the latest music releases, promotional activities from the local talents.",
          count: 0,
          icon: "fa-solid fa-bomb",
        },
      ],
    },
    {
      id: 2,
      name: "Rock",
      forums: [
        {
          id: 5,
          genreId: 2,
          name: "Rock Discussion",
          desc: "A space for open conversations covering various topics related to music, providing a platform for sharing opinions, ideas, and experiences within the community.",
          count: 1,
          icon: "fa-brands fa-microblog",
          timestamp: 1703122707000,
        },
        {
          id: 6,
          genreId: 2,
          name: "Events",
          desc: "An area dedicated to the promotion of calendared music-related events in Newfoundland, including concerts, festivals, workshops, and gatherings.",
          count: 0,
          icon: "fa-regular fa-calendar-days",
        },
        {
          id: 7,
          genreId: 2,
          name: "Local Music Artists",
          desc: "Dedicated to showcasing the musicians from the local music scene, fostering support and recognition within the community.",
          count: 0,
          icon: "fa-solid fa-guitar",
        },
        {
          id: 8,
          genreId: 2,
          name: "New Releases and Promotions",
          desc: "A forum highlighting the latest music releases, promotional activities from the local talents.",
          count: 0,
          icon: "fa-solid fa-bomb",
        },
      ],
    },
    {
      id: 3,
      name: "Punk",
      forums: [
        {
          id: 9,
          genreId: 3,
          name: "Punk Discussion",
          desc: "A space for open conversations covering various topics related to music, providing a platform for sharing opinions, ideas, and experiences within the community.",
          count: 0,
          icon: "fa-brands fa-microblog",
        },
        {
          id: 10,
          genreId: 3,
          name: "Events",
          desc: "An area dedicated to the promotion of calendared music-related events in Newfoundland, including concerts, festivals, workshops, and gatherings.",
          count: 0,
          icon: "fa-regular fa-calendar-days",
        },
        {
          id: 11,
          genreId: 3,
          name: "Local Music Artists",
          desc: "Dedicated to showcasing the musicians from the local music scene, fostering support and recognition within the community.",
          count: 0,
          icon: "fa-solid fa-guitar",
        },
        {
          id: 12,
          genreId: 3,
          name: "New Releases and Promotions",
          desc: "A forum highlighting the latest music releases, promotional activities from the local talents.",
          count: 0,
          icon: "fa-solid fa-bomb",
        },
      ],
    },
    {
      id: 4,
      name: "Folk",
      forums: [
        {
          id: 13,
          genreId: 4,
          name: "Folk Discussion",
          desc: "A space for open conversations covering various topics related to music, providing a platform for sharing opinions, ideas, and experiences within the community.",
          count: 0,
          icon: "fa-brands fa-microblog",
        },
        {
          id: 14,
          genreId: 4,
          name: "Events",
          desc: "An area dedicated to the promotion of calendared music-related events in Newfoundland, including concerts, festivals, workshops, and gatherings.",
          count: 0,
          icon: "fa-regular fa-calendar-days",
        },
        {
          id: 15,
          genreId: 4,
          name: "Local Music Artists",
          desc: "Dedicated to showcasing the musicians from the local music scene, fostering support and recognition within the community.",
          count: 0,
          icon: "fa-solid fa-guitar",
        },
        {
          id: 16,
          genreId: 4,
          name: "New Releases and Promotions",
          desc: "A forum highlighting the latest music releases, promotional activities from the local talents.",
          count: 0,
          icon: "fa-solid fa-bomb",
        },
      ],
    },
    {
      id: 5,
      name: "Alternative",
      forums: [
        {
          id: 17,
          genreId: 5,
          name: "Alternative Discussion",
          desc: "A space for open conversations covering various topics related to music, providing a platform for sharing opinions, ideas, and experiences within the community.",
          count: 0,
          icon: "fa-brands fa-microblog",
        },
        {
          id: 18,
          genreId: 5,
          name: "Events",
          desc: "An area dedicated to the promotion of calendared music-related events in Newfoundland, including concerts, festivals, workshops, and gatherings.",
          count: 0,
          icon: "fa-regular fa-calendar-days",
        },
        {
          id: 19,
          genreId: 5,
          name: "Local Music Artists",
          desc: "Dedicated to showcasing the musicians from the local music scene, fostering support and recognition within the community.",
          count: 0,
          icon: "fa-solid fa-guitar",
        },
        {
          id: 20,
          genreId: 5,
          name: "New Releases and Promotions",
          desc: "A forum highlighting the latest music releases, promotional activities from the local talents.",
          count: 0,
          icon: "fa-solid fa-bomb",
        },
      ],
    },
  ];

  const data = mockData;
  //   const isLoading = false;
  //   const error = null;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Forum</td>
            <td>Topics</td>
          </tr>
        </thead>
        <tbody>
          {/* The API data contains a list of genres to iterate through */}
          {data.map((genre) => {
            return (
              <Fragment key={genre.id}>
                <tr>
                  <td colSpan="3">Genre: {genre.name}</td>
                </tr>
                {/* Each genre also contains a list of forums to list within that genre */}
                {genre.forums.map((forum) => {
                  return (
                    <tr key={forum.id}>
                      <td>
                        <Link to={`forum/${forum.id}`} key={forum.id}>
                          {forum.name}
                          <br />
                          {forum.desc}
                          <br />
                        </Link>
                      </td>
                      <td>{forum.count}</td>
                    </tr>
                  );
                })}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestWithMockData;
