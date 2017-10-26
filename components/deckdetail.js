import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { getDeck } from "../utils/api";
import { white, gray, green, red } from "../utils/colors";

class DeckDetail extends Component {
  state = {
    title: "",
    questions: []
  };

  constructor(props) {
    super(props);
    const { title, questions } = props.navigation.state.params;

    this.state = {
      title,
      questions
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: title
    };
  };

  render() {
    const { title, questions } = this.state;
    const { navigation } = this.props;
    const { id } = navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.questions}>
            {questions.length} {questions.length === 1 ? "card" : "cards"}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigation.navigate("AddCard", {
                title: title
              })}
            title="Add Card"
            color={green}
            accessibilityLabel={`Add Card to ${id}`}
          />
          <Button
            onPress={() =>
              navigation.navigate("Quiz", {
                title: title,
                questions: questions
              })}
            title="Start Quiz"
            color={red}
            accessibilityLabel={`Start quiz ${id}`}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  title: {
    fontSize: 50
  },
  questions: {
    fontSize: 35,
    color: gray
  }
});

export default DeckDetail;
