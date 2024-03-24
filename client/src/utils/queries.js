
import { gql } from '@apollo/client';


export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      highScore
      lastScore
      friends {
        _id
      }
    }
  }
`;

export const CHECK_HS = gql`
  query checkHighScore($player: ID!, $difficulty: String!) {
    checkHighScore(player: $player, difficulty: $difficulty) {
      value
      highScore
      difficulty
      player {
        _id
      }
    }
  }
`;

export const LEADERBOARD = gql`
  {
    leaderboard {
      value
      difficulty
      player {
        _id
        username
      }
    }
  }
`;

export const PROFILE = gql`
  query profile {
    profile {
      value
      difficulty
      highScore
      player {
        _id
      }
    }
  }
`;