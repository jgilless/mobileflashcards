import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";

import { getDecks } from "../utils/api";

import { white, gray } from "../utils/colors";

function Deck({ title, questions, navigation, ...props }) {
  if (!questions) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DeckDetail", {
          title: title,
          questions: questions,
          ...props
        })}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.questions}>
          {questions.length} {questions.length === 1 ? "card" : "cards"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

class DeckList extends Component {
  state = {
    decks: [],
    refreshing: false
  };

  _getDecks() {
    this.setState({
      refreshing: true
    });

    getDecks()
      .then(results => {
        if (!results) {
          this.setState({
            refreshing: false
          });
          return;
        }
        this.setState({
          decks: Object.keys(results).map(key => {
            return results[key];
          }),
          refreshing: false
        });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this._getDecks();
  }

  componentWillReceiveProps() {
    this._getDecks();
  }

  _renderItem = ({ item }) => {
    return (
      <View key={item.title}>
        <Deck
          title={item.title}
          questions={item.questions}
          navigation={this.props.navigation}
        />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { decks, refreshing } = this.state;

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
          refreshing={refreshing}
          onRefresh={() => this._getDecks()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  title: {
    fontSize: 35
  },
  questions: {
    fontSize: 20,
    color: gray
  }
});

export default DeckList;
