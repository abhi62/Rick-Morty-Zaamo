import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS = gql`
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

export const GET_PAGE_INFO = gql`
  query Character {
    characters {
      info {
        pages
      }
    }
  }
`;

export const GET_SINGLE_CHARACTERS = gql`
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

export const GET_SEARCH_CHARACTERS = gql`
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

export const GET_SEARCH_EPISODES = gql`
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

export const GET_SINGLE_EPISODE = gql`
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
export const GET_ALL_EPISODE = gql`
  query episodes {
    episodes {
      results {
        id
        name
        air_date
        episode
        characters {
          image
        }
      }
    }
  }
`;
