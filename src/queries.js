import { gql } from "@apollo/client";

const GET_ALL_CHARACTERS = gql`
  query Character($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
        species
        location {
          name
        }
      }
    }
  }
`;

const GET_ALL_EPISODES = gql`
  query episodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_PAGE_INFO = gql`
  query Character {
    characters {
      info {
        pages
      }
    }
  }
`;

const GET_SINGLE_CHARACTERS = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_SEARCH_CHARACTERS = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
        status
        species
        location {
          name
        }
      }
    }
  }
`;

const GET_SEARCH_EPISODES = gql`
  query episodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_SINGLE_EPISODE = gql`
  query episode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
        status
        species
        location {
          name
        }
      }
    }
  }
`;

export {
  GET_ALL_CHARACTERS,
  GET_PAGE_INFO,
  GET_SINGLE_CHARACTERS,
  GET_SINGLE_EPISODE,
  GET_SEARCH_CHARACTERS,
  GET_SEARCH_EPISODES,
  GET_ALL_EPISODES,
};
