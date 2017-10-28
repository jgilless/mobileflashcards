import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { white, gray, green } from "../utils/colors";

import { addCardToDeck } from "../utils/api";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: `Add Card to ${title}`
    };
  };

  submit = () => {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const { title } = navigation.state.params;

    addCardToDeck(title, {
      question: question,
      answer: answer
    }).then(results => {
      navigation.navigate("DeckList");
    });
  };

  render() {
    const { navigation } = this.props;
    const { title } = navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          style={styles.textbox}
          onChangeText={text => this.setState({ question: text })}
          value={this.state.question}
        />
        <Text style={styles.label}>Answer</Text>
        <TextInput
          style={styles.textbox}
          onChangeText={text => this.setState({ answer: text })}
          value={this.state.answer}
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

export default AddCard;
