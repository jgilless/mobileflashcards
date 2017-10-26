import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { white, gray, green } from "../utils/colors";

import { saveDeckTitle } from "../utils/api";

class NewDeck extends Component {
  state = {
    title: ""
  };

  static navigationOptions = () => {
    return {
      title: `New Deck`
    };
  };

  submit = () => {
    const { navigation } = this.props;
    const { title } = this.state;
    if (title === "") {
      return;
    }

    saveDeckTitle(title);

    navigation.navigate("DeckList", {
      action: "adddeck",
      title: title,
      questions: []
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Deck Title</Text>
        <TextInput
          style={styles.textbox}
          onChangeText={text => this.setState({ title: text })}
          value={this.state.question}
        />
        <Button
          onPress={this.submit}
          title="Submit"
          color={green}
          accessibilityLabel="Submit"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: white
  },
  label: {
    fontSize: 20
  },
  textbox: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    fontSize: 20,
    marginBottom: 15
  }
});

export default NewDeck;
