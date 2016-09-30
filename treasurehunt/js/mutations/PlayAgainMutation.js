import Relay from 'react-relay';

export default class PlayAgainMutation extends Relay.Mutation {
  static fragments = {
    game: () => Relay.QL`
      fragment on Game {
        id,
        turnsRemaining,
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation { playAgain }`;
  }

  getCollisionKey() {
    return `play_${Math.random()}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on PlayAgainPayload @relay(pattern: true) {
        game {
          turnsRemaining,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        game: this.props.game.id,
      },
    }];
  }

  getVariables() {
    return {
      id: this.props.hidingSpot.id,
    };
  }

  getOptimisticResponse() {
    return {
      game: {
        turnsRemaining: 3,
      },
    }
  }
}
