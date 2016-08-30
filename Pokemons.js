'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
  Alert,
} = ReactNative;


class Pokemons extends React.Component {
  constructor(props) {
    super(props)
    const datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      abilities: datasource.cloneWithRows(['Loading Abilities...']),
      pokemonName: "Loading name...",
    }
  }

  componentDidMount() {
    this.fetchPokemon('squirle')
  }

  fetchPokemon(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => response.json())
      .then((responseData) => {
        let abilityNames = responseData.abilities.map((ability) => ability.ability.name)
        this.setState({
          abilities: this.state.abilities.cloneWithRows(abilityNames),
          pokemonName: responseData.name
        })
      })
      .catch((err) => {this.handleResponseError(err)})
  }

  handleResponseError(error) {
    Alert.alert(
      'Alert Title',
      'My Alert Message',
      [
        { text: 'Try Again', onPress: () => this.fetchPokemon('squirtle') },
        { text: 'Nevermind', onPress: () => console.log('user clicked ok'), style: 'cancel' },
      ]
    )
  }

  render() {
    return (
      <View style={styles.pokemonHeading}>
        <Text style={styles.pokemonHeadingText}>
          {this.state.pokemonName}
        </Text>
        <ListView
          style={styles.listViewContainer}
          dataSource={this.state.abilities}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  pokemonHeading: {
    marginTop: 10,
  },
  pokemonHeadingText: {
    fontSize: 30,
    fontWeight: '600',
  },
  listViewContainer: {
    height: 200,
    backgroundColor: 'wheat',
  }
});

module.exports = Pokemons;
